import { prisma } from '@/lib/prisma'
import { hash, genSalt } from 'bcrypt'
import { UserInputError } from 'apollo-server-micro'
import { v4 as uuidv4 } from 'uuid'

export const userResolvers = {
  Mutation: {
    signUpUser: async (_: any, { data }: { data: { name: string; email: string; password: string; companyName: string } }) => {
      const { email, password, name, companyName } = data

      // Validate email
      if (!email || !email.includes('@')) {
        throw new UserInputError('Invalid email address')
      }

      // Validate password
      if (password.length < 8) {
        throw new UserInputError('Password must be at least 8 characters long')
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        throw new UserInputError('User with this email already exists')
      }

      // Generate salt and hash password
      const passwordSalt = await genSalt(10)
      const hashedPassword = await hash(password, passwordSalt)

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          passwordSalt,
          name,
          lastLoginAt: new Date(),
        },
      })

      // Create company with provided name or a default name
      const companyNameToUse = companyName || `Personal_${uuidv4()}`
      const company = await prisma.company.create({
        data: {
          name: companyNameToUse,
          owner: {
            connect: { id: user.id },
          },
        },
      })

      // Create hiring role for the user in the company
      await prisma.hiringRole.create({
        data: {
          user: { connect: { id: user.id } },
          company: { connect: { id: company.id } },
          role: {
            create: {
              name: 'Owner',
              abilities: ['MANAGE_COMPANY'],
              company: { connect: { id: company.id } },
            },
          },
        },
      })

      // Fetch the user with the associated company and hiring role
      const userWithCompanyAndRole = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          companiesOwned: true,
          hiringRoles: {
            include: {
              company: true,
              role: true,
            },
          },
        },
      })

      return userWithCompanyAndRole
    },
  },
}
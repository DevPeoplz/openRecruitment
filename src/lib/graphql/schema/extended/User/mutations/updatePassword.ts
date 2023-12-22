import { prisma } from '@/lib/prisma'
import { builder } from '@/lib/graphql/schema/builder'
import { defineMutationFunction, defineMutationPrismaObject } from '../../../__generated__/utils'
import { getUserWithCredentials } from '@/pages/api/user/check-credentials'
import { hash } from 'bcrypt'

const updatePasswordInput = builder
  .inputRef<{
    password: string
    newPassword: string
    confirmPassword: string
  }>('UpdatePasswordInput')
  .implement({
    fields: (t) => ({
      password: t.field({ required: true, type: 'String' }),
      newPassword: t.field({ required: true, type: 'String' }),
      confirmPassword: t.field({ required: true, type: 'String' }),
    }),
  })

export const updatePasswordUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: false,
    args: { data: t.arg({ type: updatePasswordInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      const email: string = _context?.session?.user?.email

      if (!selectedCompany) throw new Error('No company selected')

      if (email === undefined) throw new Error('Email is required')

      if (!args.data.newPassword || args.data.newPassword.length < 8)
        throw new Error('Password must be at least 8 characters long')

      if (args.data.newPassword === args.data.password)
        throw new Error('New password cannot be the same as the old password')

      if (args.data.newPassword !== args.data.confirmPassword)
        throw new Error('Passwords do not match')

      const credentials = {
        email: email,
        password: args.data.password,
      }

      const user = await getUserWithCredentials(credentials)

      if (!user) {
        throw new Error('Wrong credentials. Try again.')
      }

      return prisma.user.update({
        where: { id: user.id },
        data: { password: await hash(args.data.newPassword, 12) },
      })
    },
  })
)

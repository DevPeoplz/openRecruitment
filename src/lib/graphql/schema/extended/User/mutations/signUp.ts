import { Prisma } from '@prisma/client'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma'
import { builder } from '@/lib/graphql/schema/builder'
import { defineMutationFunction, defineMutationPrismaObject } from '../../../__generated__/utils'

const UserSignUpInput = builder
  .inputRef<
    Prisma.UserCreateInput & {
      companyName: string
    }
  >('UserSignUpInput')
  .implement({
    fields: (t) => ({
      ...Inputs.UserCreateInputFields(t),
      companyName: t.field({ required: true, type: 'String' }),
    }),
  })

export const signUpUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: false,
    args: { data: t.arg({ type: UserSignUpInput, required: true }) },
    resolve: async (query, _root, args) => {
      const { companyName, ...userArgs } = args.data

      if (userArgs.email === undefined || !userArgs.email.endsWith('@devpeoplz.com'))
        throw new Error('Email is required')

      const user = await prisma.user.create({ data: userArgs, ...query })
      await prisma.company.create({ data: { name: companyName, ownerId: user.id } })

      return (await prisma.user.findUnique({ where: { id: user.id } })) ?? user
    },
  })
)

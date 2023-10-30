/* eslint-disable @typescript-eslint/no-explicit-any */
import { me } from './me'
import { PrismaClientError } from '@prisma/engine-core/dist/common/errors/PrismaClientError'

export const utils = {
  me,
}

export const defaultPrismaQueryOptions = async ({
  query,
  context,
  args,
  prisma,
  model,
  method,
  defaultValue,
}: {
  query?: any
  context: any
  args: any
  prisma: any
  model: any
  method: any
  defaultValue?: any
}) => {
  const selectedCompany = context?.session?.user?.selectedCompany
  const whereCompanyFromSession =
    method === 'findUnique'
      ? {
          ...args.where,
          AND: {
            companyId: selectedCompany,
          },
        }
      : {
          AND: {
            ...args.where,
            companyId: selectedCompany,
          },
        }

  const options = {
    where: whereCompanyFromSession,
    cursor: args.cursor || undefined,
    take: args.take || undefined,
    distinct: args.distinct || undefined,
    skip: args.skip || undefined,
    orderBy: args.orderBy || undefined,
    ...(query ?? {}),
  }

  if (!selectedCompany && !defaultValue) {
    throw new Error('No company selected')
  }

  return !selectedCompany ? defaultValue : await prisma[model][method](options)
}

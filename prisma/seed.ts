import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // const user1 = await prisma.user.upsert({
  //   where: { email: 'admin@admin.ad' },
  //   update: {},
  //   create: {
  //     id: '12345',
  //     email: 'admin@admin.ad',
  //     password: await hash('admin', 12),
  //     name: 'Admin',
  //     phone: '1234567',
  //     firstName: 'Admin',
  //     lastName: 'Smith',
  //     preferredLanguage: 'en',
  //     timeformat24: true,
  //     timezone: '5',
  //     weekStartDate: 'monday',
  //     featureDiscovery: ['asdf1'],
  //     emailProvider: ['email1'],
  //     theme: 'light',
  //     notifications: { asdf: '1234' },
  //     updatedAt: new Date(),
  //     userRole: 'SUPERADMIN',
  //   },
  // })
  // console.log({ user1 })
  // const user2 = await prisma.user.upsert({
  //   where: { email: 'peter@admin.ad' },
  //   update: {},
  //   create: {
  //     id: '23456',
  //     email: 'peter@admin.ad',
  //     password: await hash('admin', 12),
  //     name: 'Peter',
  //     phone: '12345672',
  //     firstName: 'Peter',
  //     lastName: 'Johnson',
  //     preferredLanguage: 'en',
  //     timeformat24: true,
  //     timezone: '5',
  //     weekStartDate: 'monday',
  //     featureDiscovery: ['asdf1'],
  //     emailProvider: ['email1'],
  //     theme: 'light',
  //     notifications: { asdf: '1234' },
  //     updatedAt: new Date(),
  //     userRole: 'SUPERADMIN',
  //   },
  // })
  // console.log({ user2 })
  // const company1 = await prisma.company.upsert({
  //   where: { id: '1' },
  //   update: {},
  //   create: {
  //     id: '1',
  //     name: 'Testing Company Co',
  //     ownerId: '12345',
  //   },
  // })
  // console.log({ company1 })
  // const company2 = await prisma.company.upsert({
  //   where: { id: '2' },
  //   update: {},
  //   create: {
  //     id: '2',
  //     name: 'Company Test 2',
  //     ownerId: '23456',
  //   },
  // })
  // console.log({ company2 })
  // const company3 = await prisma.company.upsert({
  //   where: { id: '3' },
  //   update: {},
  //   create: {
  //     id: '3',
  //     name: 'Test Company 3',
  //     ownerId: '23456',
  //   },
  // })
  // console.log({ company3 })
  // const defaultRoles = async (companyIdS: string) => {
  //   const companyId = parseInt(companyIdS)
  //   const role1 = await prisma.role.upsert({
  //     where: { id: companyId * 1000 + 1 },
  //     update: {},
  //     create: {
  //       id: companyId * 1000 + 1,
  //       name: 'Administrator',
  //       abilities: ['all'],
  //       companyId: companyIdS,
  //     },
  //   })
  //   const role2 = await prisma.role.upsert({
  //     where: { id: companyId * 1000 + 2 },
  //     update: {},
  //     create: {
  //       id: companyId * 1000 + 2,
  //       name: 'Recruiter',
  //       abilities: ['recruiter'],
  //       companyId: companyIdS,
  //     },
  //   })
  //   const role3 = await prisma.role.upsert({
  //     where: { id: companyId * 1000 + 3 },
  //     update: {},
  //     create: {
  //       id: companyId * 1000 + 3,
  //       name: 'Viewer',
  //       abilities: ['viewer'],
  //       companyId: companyIdS,
  //     },
  //   })
  // }
  // for (const company of [company1, company2, company3]) {
  //   await defaultRoles(company.id)
  // }
  // const hiringRole1 = await prisma.hiringRole.upsert({
  //   where: { id: 1 },
  //   update: {},
  //   create: {
  //     userId: user1.id,
  //     roleId: parseInt(company1.id) * 1000 + 1,
  //   },
  // })
  // const hiringRole2 = await prisma.hiringRole.upsert({
  //   where: { id: 2 },
  //   update: {},
  //   create: {
  //     userId: user1.id,
  //     roleId: parseInt(company2.id) * 1000 + 2,
  //   },
  // })
  // const hiringRole3 = await prisma.hiringRole.upsert({
  //   where: { id: 3 },
  //   update: {},
  //   create: {
  //     userId: user1.id,
  //     roleId: parseInt(company3.id) * 1000 + 3,
  //   },
  // })
  // const hiringRole4 = await prisma.hiringRole.upsert({
  //   where: { id: 4 },
  //   update: {},
  //   create: {
  //     userId: user2.id,
  //     roleId: parseInt(company1.id) * 1000 + 1,
  //   },
  // })
  // const adminPhoto =
  //   '1' ||
  //   (await prisma.attachment.upsert({
  //     where: { id: 1 },
  //     update: {},
  //     create: {
  //       contentType: 'profilePhoto',
  //       filename: 'photo1.png',
  //       path: '/images/photo1.png',
  //       uploaderId: 1,
  //       updatedAt: new Date(),
  //     },
  //   }))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

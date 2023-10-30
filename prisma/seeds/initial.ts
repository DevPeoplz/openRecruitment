import { PrismaClient, TagSourceType, TemplateTypes } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const userJames = await prisma.user.upsert({
    where: { email: 'jamesr@devpeoplz.com' },
    update: {},
    create: {
      id: 'dev1',
      email: 'jamesr@devpeoplz.com',
      password: await hash('jamesr@recruitment', 12),
      name: 'James',
      phone: '3213213213',
      firstName: 'James',
      lastName: 'Ray',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['team'],
      emailProviders: ['gmail'],
      theme: 'light',
      userRole: 'SUPERADMIN',
    },
  })

  const userAlejo = await prisma.user.upsert({
    where: { email: 'alejo.lpaz@devpeoplz.com' },
    update: {},
    create: {
      id: 'dev2',
      email: 'alejo.lpaz@devpeoplz.com',
      password: await hash('alejo.lpaz@recruitment', 12),
      name: 'Alejo',
      phone: '3213213213',
      firstName: 'Alejandro',
      lastName: 'Lopez',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['team'],
      emailProviders: ['gmail'],
      theme: 'light',
      userRole: 'SUPERADMIN',
    },
  })

  const userLuis = await prisma.user.upsert({
    where: { email: 'luis.ramirez@devpeoplz.com' },
    update: {},
    create: {
      id: 'dev3',
      email: 'luis.ramirez@devpeoplz.com',
      password: await hash('luis.ramirez@recruitment', 12),
      name: 'Luis',
      phone: '3213213213',
      firstName: 'Luis',
      lastName: 'Ramirez',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['team'],
      emailProviders: ['gmail'],
      theme: 'light',
      userRole: 'SUPERADMIN',
    },
  })

  const userMelissa = await prisma.user.upsert({
    where: { email: 'melissa.valez@devpeoplz.com' },
    update: {},
    create: {
      id: 'dev4',
      email: 'melissa.valez@devpeoplz.com',
      password: await hash('melissa.valez@recruitment', 12),
      name: 'Melissa',
      phone: '3213213213',
      firstName: 'Melissa',
      lastName: 'Valez',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['team'],
      emailProviders: ['gmail'],
      theme: 'light',
    },
  })

  const companyDevPeoplz = await prisma.company.upsert({
    where: { id: 'devpeoplz1' },
    update: {},
    create: {
      id: 'devpeoplz1',
      name: 'DevPeoplz',
      ownerId: 'dev1',
    },
  })

  const roles = [
    {
      id: 1001,
      name: 'Administrator',
      abilities: ['all'],
    },
    {
      id: 1002,
      name: 'Recruiter',
      abilities: ['recruiter'],
    },
    {
      id: 1003,
      name: 'Viewer',
      abilities: ['viewer'],
    },
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: {
        id: role.id,
        name: role.name,
        abilities: role.abilities,
        companyId: companyDevPeoplz.id,
      },
    })
  }

  const hiringRoleJames = await prisma.hiringRole.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: userJames.id,
      roleId: roles[0].id,
      companyId: companyDevPeoplz.id,
    },
  })

  const hiringRoleAlejo = await prisma.hiringRole.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      userId: userAlejo.id,
      roleId: roles[0].id,
      companyId: companyDevPeoplz.id,
    },
  })

  const hiringRoleLuis = await prisma.hiringRole.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      userId: userLuis.id,
      roleId: roles[0].id,
      companyId: companyDevPeoplz.id,
    },
  })

  const hiringRoleMelissa = await prisma.hiringRole.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      userId: userMelissa.id,
      roleId: roles[1].id,
      companyId: companyDevPeoplz.id,
    },
  })

  const defaultPipelineTemplate = await prisma.template.upsert({
    where: { id: 1 },
    include: { stages: true },
    update: {},
    create: {
      id: 1,
      companyId: companyDevPeoplz.id,
      name: 'Default Pipeline',
      type: TemplateTypes.PIPELINE,
      stages: {
        create: [
          {
            category: 'Applied',
            position: 1,
          },
          {
            category: 'Phone Screen',
            position: 2,
          },
          {
            category: 'Interview',
            position: 3,
          },
          {
            category: 'Interview #2',
            position: 4,
          },
          {
            category: 'Offer',
            position: 5,
          },
          {
            category: 'Hired',
            position: 6,
          },
          {
            category: 'Rejected',
            position: 7,
          },
        ],
      },
    },
  })

  const tagsOffers = ['Lead', 'Senior', 'Junior', 'Mid Level', 'Entry Level']
  const tagsCandidates = ['Lead', 'Senior', 'Junior', 'Mid Level', 'Entry Level']
  const sources = ['Resume Sent', 'Referral', 'LinkedIn', 'Facebook', 'Indeed', 'Careers Site']

  const tagType = {
    offer: {
      id: 1000,
      type: TagSourceType.TAG_OFFER,
      tags: tagsOffers,
    },
    candidate: {
      id: 2000,
      type: TagSourceType.TAG_CANDIDATE,
      tags: tagsCandidates,
    },
    source: {
      id: 3000,
      type: TagSourceType.SOURCE,
      tags: sources,
    },
  }

  for (const [type, data] of Object.entries(tagType)) {
    for (const [i, name] of data.tags.entries()) {
      await prisma.tagSource.upsert({
        where: { id: data.id + i },
        update: {},
        create: {
          id: data.id + i,
          name: name,
          type: data.type,
          companyId: companyDevPeoplz.id,
        },
      })
    }
  }

  const offerTesting = await prisma.offer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Testing Offer',
      companyId: companyDevPeoplz.id,
      pipelineTemplateId: defaultPipelineTemplate.id,
    },
  })

  // Set relation offer - tag
  await prisma.offer.update({
    where: { id: offerTesting.id },
    data: {
      offerTags: {
        connectOrCreate: [
          {
            create: { tagId: 1002 },
            where: { offerId_tagId: { tagId: 1001, offerId: offerTesting.id } },
          },
          {
            create: { tagId: 1003 },
            where: { offerId_tagId: { tagId: 1002, offerId: offerTesting.id } },
          },
          {
            create: { tagId: 1004 },
            where: { offerId_tagId: { tagId: 1003, offerId: offerTesting.id } },
          },
        ],
      },
    },
  })

  console.log(userJames)
  console.log(userAlejo)
  console.log(userLuis)
  console.log(userMelissa)
  console.log(companyDevPeoplz)
  console.log(hiringRoleJames)
  console.log(hiringRoleAlejo)
  console.log(hiringRoleLuis)
  console.log(hiringRoleMelissa)
  console.log(defaultPipelineTemplate)
  console.log(tagType)
  console.log(offerTesting)
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

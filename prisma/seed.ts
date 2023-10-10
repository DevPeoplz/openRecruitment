import { PrismaClient, TagSourceType } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@admin.ad' },
    update: {},
    create: {
      id: '12345',
      email: 'admin@admin.ad',
      password: await hash('admin', 12),
      name: 'Admin',
      phone: '1234567',
      firstName: 'Admin',
      lastName: 'Smith',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['asdf1'],
      emailProviders: ['email1'],
      theme: 'light',
      notifications: { asdf: '1234' },
      updatedAt: new Date(),
      userRole: 'SUPERADMIN',
    },
  })
  console.log({ user1 })

  const adminPhoto =
    '1' ||
    (await prisma.attachment.upsert({
      where: { id: 1 },
      update: {},
      create: {
        contentType: 'profilePhoto',
        filename: 'photo1.png',
        path: '/images/photo1.png',
        uploaderId: 1,
        updatedAt: new Date(),
      },
    }))

  const user2 = await prisma.user.upsert({
    where: { email: 'peter@admin.ad' },
    update: {},
    create: {
      id: '23456',
      email: 'peter@admin.ad',
      password: await hash('admin', 12),
      name: 'Peter',
      phone: '12345672',
      firstName: 'Peter',
      lastName: 'Johnson',
      preferredLanguage: 'en',
      timeformat24: true,
      timezone: '5',
      weekStartDate: 'monday',
      featureDiscovery: ['asdf1'],
      emailProviders: ['email1'],
      theme: 'light',
      notifications: { asdf: '1234' },
      updatedAt: new Date(),
      userRole: 'SUPERADMIN',
    },
  })
  console.log({ user2 })

  const company1 = await prisma.company.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Testing Company Co',
      ownerId: '12345',
    },
  })
  console.log({ company1 })

  const company2 = await prisma.company.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Company Test 2',
      ownerId: '23456',
    },
  })
  console.log({ company2 })

  const company3 = await prisma.company.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'Test Company 3',
      ownerId: '23456',
    },
  })
  console.log({ company3 })

  const defaultRoles = async (companyIdS: string) => {
    const companyId = parseInt(companyIdS)

    const role1 = await prisma.role.upsert({
      where: { id: companyId * 1000 + 1 },
      update: {},
      create: {
        id: companyId * 1000 + 1,
        name: 'Administrator',
        abilities: ['all'],
        companyId: companyIdS,
      },
    })
    const role2 = await prisma.role.upsert({
      where: { id: companyId * 1000 + 2 },
      update: {},
      create: {
        id: companyId * 1000 + 2,
        name: 'Recruiter',
        abilities: ['recruiter'],
        companyId: companyIdS,
      },
    })
    const role3 = await prisma.role.upsert({
      where: { id: companyId * 1000 + 3 },
      update: {},
      create: {
        id: companyId * 1000 + 3,
        name: 'Viewer',
        abilities: ['viewer'],
        companyId: companyIdS,
      },
    })
  }

  for (const company of [company1, company2, company3]) {
    await defaultRoles(company.id)
  }

  const hiringRole1 = await prisma.hiringRole.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user1.id,
      roleId: parseInt(company1.id) * 1000 + 1,
      companyId: company1.id,
    },
  })

  const hiringRole2 = await prisma.hiringRole.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: user1.id,
      roleId: parseInt(company2.id) * 1000 + 2,
      companyId: company2.id,
    },
  })

  const hiringRole3 = await prisma.hiringRole.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: user1.id,
      roleId: parseInt(company3.id) * 1000 + 3,
      companyId: company3.id,
    },
  })

  const hiringRole4 = await prisma.hiringRole.upsert({
    where: { id: 4 },
    update: {},
    create: {
      userId: user2.id,
      roleId: parseInt(company1.id) * 1000 + 1,
      companyId: company1.id,
    },
  })

  const candidate1 = await prisma.candidate.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Candidate',
      lastName: 'Number 1',
      email: 'candidate1@admin.com',
      phone: '1234123123',
      educationLevel: 'Bachelors degree',
      socials: ['https://twitter.com/@candidate1'],
      salaryExpectation: '5000',
      companyId: company1.id,
      birthDate: new Date('1993-01-01'),
    },
  })

  const candidate2 = await prisma.candidate.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'Candidate',
      lastName: 'Number 2',
      email: 'candidate2@admin.com',
      phone: '1234123123',
      educationLevel: 'Bachelors degree',
      socials: ['https://twitter.com/@candidate2'],
      salaryExpectation: '5000',
      companyId: company1.id,
      birthDate: new Date('1993-01-01'),
    },
  })

  const candidate3 = await prisma.candidate.upsert({
    where: { id: 3 },
    update: {},
    create: {
      firstName: 'Candidate',
      lastName: 'Number 3',
      email: 'candidate3@admin.com',
      phone: '1234123123',
      educationLevel: 'Bachelors degree',
      socials: ['https://twitter.com/@candidate3'],
      salaryExpectation: '5000',
      companyId: company1.id,
      birthDate: new Date('1993-01-01'),
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
  })

  const candidate4 = await prisma.candidate.upsert({
    where: { id: 4 },
    update: {},
    create: {
      firstName: 'Candidate 4',
      lastName: 'Number 4',
      email: 'candidate4@admin.com',
      phone: '1234123123',
      educationLevel: 'High School',
      socials: ['https://twitter.com/@candidate4'],
      salaryExpectation: '1500',
      companyId: company1.id,
      birthDate: new Date('1994-01-01'),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  })

  const candidate5 = await prisma.candidate.upsert({
    where: { id: 5 },
    update: {},
    create: {
      firstName: 'Candidate 5',
      lastName: 'Number 5',
      email: 'candidate5@admin.com',
      phone: '1234123123',
      educationLevel: 'Postgraduate',
      socials: ['https://twitter.com/@candidate5'],
      salaryExpectation: '10000',
      companyId: company1.id,
      birthDate: new Date('1995-01-01'),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  })

  console.log(candidate5)

  const offer1 = await prisma.offer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Offer 1',
      companyId: company1.id,
    },
  })

  const offer2 = await prisma.offer.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Offer 2',
      companyId: company1.id,
    },
  })

  console.log(offer2)

  const stage1 = await prisma.stage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      category: 'Test Stage 1',
    },
  })

  const stage2 = await prisma.stage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      category: 'Test Stage 2',
    },
  })

  const talentPool1 = await prisma.talentPool.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Talent Pool 1',
      companyId: company1.id,
    },
  })

  console.log(talentPool1)

  const match1 = await prisma.match.upsert({
    where: { id: 1 },
    update: {},
    create: {
      candidateId: candidate1.id,
      offerId: offer1.id,
      stageId: stage1.id,
    },
  })

  const match2 = await prisma.match.upsert({
    where: { id: 2 },
    update: {},
    create: {
      candidateId: candidate2.id,
      offerId: offer2.id,
      stageId: stage2.id,
    },
  })

  const match3 = await prisma.match.upsert({
    where: { id: 3 },
    update: {},
    create: {
      candidateId: candidate2.id,
      offerId: offer1.id,
      stageId: stage2.id,
    },
  })

  const talentPoolMatch1 = await prisma.talentPoolMatch.upsert({
    where: { id: 1 },
    update: {},
    create: {
      candidateId: candidate1.id,
      talentPoolId: talentPool1.id,
    },
  })

  const tags = ['Sample', 'Senior', 'Junior', 'Mid Level', 'Entry Level']
  const sources = ['Indeed', 'Careers Site', 'Resume Sent', 'LinkedIn', 'Referral', 'Facebook']

  const defaultTags = async (companyIdS: string) => {
    const companyId = parseInt(companyIdS)

    for (const type of ['TAG', 'SOURCE']) {
      const names = type === 'TAG' ? tags : sources

      let ti = 1
      for (const name of names) {
        await prisma.tagSource.upsert({
          where: { id: companyId * 1000 + (type === 'TAG' ? 0 : 100) + ti },
          update: {},
          create: {
            id: companyId * 1000 + (type === 'TAG' ? 0 : 100) + ti,
            name: name,
            type: type === 'TAG' ? TagSourceType.TAG_CANDIDATE : TagSourceType.SOURCE,
            companyId: companyIdS,
          },
        })
        ti++
      }
    }
  }

  for (const company of [company1, company2, company3]) {
    await defaultTags(company.id)
  }

  // Set relation candidate - tag_candidate
  await prisma.candidate.update({
    where: { id: 1 },
    data: {
      candidateTags: {
        connectOrCreate: [
          {
            create: { tagId: 1001 },
            where: { candidateId_tagId: { tagId: 1001, candidateId: 1 } },
          },
          {
            create: { tagId: 1002 },
            where: { candidateId_tagId: { tagId: 1002, candidateId: 1 } },
          },
        ],
      },
    },
  })

  await prisma.candidate.update({
    where: { id: 2 },
    data: {
      candidateTags: {
        connectOrCreate: [
          {
            create: { tagId: 1002 },
            where: { candidateId_tagId: { tagId: 1002, candidateId: 2 } },
          },
          {
            create: { tagId: 1003 },
            where: { candidateId_tagId: { tagId: 1003, candidateId: 2 } },
          },
          {
            create: { tagId: 1004 },
            where: { candidateId_tagId: { tagId: 1004, candidateId: 2 } },
          },
        ],
      },
    },
  })

  // Set relation offer - tag
  await prisma.offer.update({
    where: { id: offer1.id },
    data: {
      offerTags: {
        connectOrCreate: [
          {
            create: { tagId: 1002 },
            where: { offerId_tagId: { tagId: 1002, offerId: offer1.id } },
          },
          {
            create: { tagId: 1003 },
            where: { offerId_tagId: { tagId: 1003, offerId: offer1.id } },
          },
          {
            create: { tagId: 1004 },
            where: { offerId_tagId: { tagId: 1004, offerId: offer1.id } },
          },
        ],
      },
    },
  })

  // Set relation source - candidate/referral
  await prisma.candidate.update({
    where: { id: 1 },
    data: {
      referrerId: 1101,
    },
  })

  await prisma.candidate.update({
    where: { id: 2 },
    data: {
      referrerId: 1102,
    },
  })

  await prisma.candidate.update({
    where: { id: 3 },
    data: {
      referrerId: 1102,
    },
  })

  await prisma.candidate.update({
    where: { id: 4 },
    data: {
      referrerId: 1103,
    },
  })

  await prisma.candidate.update({
    where: { id: 5 },
    data: {
      referrerId: 1104,
    },
  })

  // upsert an audit log
  const auditLog1 = await prisma.auditLog.upsert({
    where: { id: 1 },
    update: {},
    create: {
      actor: user1.firstName + ' ' + user1.lastName,
      actorType: 'user',
      ip: '192.168.0.1',
      action: 'Create Candidate',
      eventDetails: {
        user: {
          id: user1.id,
          email: user1.email,
          firstName: user1.firstName,
          lastName: user1.lastName,
        },
        candidate: {
          email: candidate1.email,
          id: candidate1.id,
          name: candidate1.firstName + ' ' + candidate1.lastName,
        },
      },
      userId: hiringRole1.id,
      companyId: company1.id,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  })

  const auditLog2 = await prisma.auditLog.upsert({
    where: { id: 2 },
    update: {},
    create: {
      actor: user1.firstName + ' ' + user1.lastName,
      actorType: 'user',
      ip: '192.168.0.5',
      action: 'Create Offer',
      eventDetails: {
        user: {
          id: user1.id,
          email: user1.email,
          firstName: user1.firstName,
          lastName: user1.lastName,
        },
        offer: {
          id: offer1.id,
          name: offer1.name,
        },
      },
      userId: hiringRole1.id,
      companyId: company1.id,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
  })

  const auditLog3 = await prisma.auditLog.upsert({
    where: { id: 3 },
    update: {},
    create: {
      actor: user2.firstName + ' ' + user2.lastName,
      actorType: 'user',
      ip: '192.168.0.10',
      action: 'Update Offer',
      eventDetails: {
        user: {
          id: user2.id,
          email: user2.email,
          firstName: user2.firstName,
          lastName: user2.lastName,
        },
        offer: {
          id: offer2.id,
          name: offer2.name,
        },
      },
      userId: hiringRole4.id,
      companyId: company1.id,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  })
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

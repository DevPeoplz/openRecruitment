import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { omit } from 'lodash'
import { getURL } from '@/utils/dual'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handlePOST(res, req)
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

export const getUserWithCredentials = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  if (!credentials) return null

  return fetch(getURL('/api/user/check-credentials'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: Object.entries(credentials ?? [])
      .map((e) => e.map((e) => encodeURIComponent(e)).join('='))
      .join('&'),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err)
      return null
    })
}

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      photo: {
        select: {
          path: true,
        },
      },
      userRole: true,
      password: true,
    },
  })

  if (user && user.password && (await compare(req.body.password, user.password))) {
    res.json(omit(user, 'password'))
  } else {
    res.status(400).json({ error: 'Invalid credentials' })
  }
}

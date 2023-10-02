import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { omit } from 'lodash'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handlePOST(res, req)
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  const session = await getServerSession(req, res, authOptions)
  const data = await req.formData()

  console.log('req.body')
  console.log(JSON.stringify(req.body))
  console.log(JSON.stringify(session))

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const companyId = session.user.selectedCompany

  if (!companyId) {
    return res.status(401).json({ error: 'Unauthorized. No Company Found' })
  }

  const id = await createItem(data)

  if (!req.body) {
    return res.status(401).json({ error: 'No Candidate found' })
  }

  const fileFolders = ['avatar', 'cv', 'cover-letter']

  // fileFolders.map((folder) => {
  //   if (!fs.existsSync(`assets/company-${companyId}/${folder}`)) {
  //     fs.mkdirSync(`assets/company-${companyId}/${folder}`)
  //   }
  // })

  if (req.body.name && !fileFolders.includes(req.body.name) && req.body.file) {
    return res.status(400).json({ error: 'Invalid property to upload!' })
  }

  const storage = multer.diskStorage({
    destination: `assets/company-${companyId}/${req.body.name}/`, // Change the destination folder as needed
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const extension = path.extname(file.originalname)
      cb(null, `${uniqueSuffix}${extension}`)
    },
  })

  const upload = multer({ storage })

  try {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      }

      return res.status(200).json({ message: 'File uploaded successfully' })
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import formidable from 'formidable'
import { join } from 'path'
import fs from 'fs'
import { mkdir, readFile, unlink, writeFile } from 'fs/promises'
import { v4 } from 'uuid'
import { prisma } from '@/lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}
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

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const companyId = session.user.selectedCompany

  if (!companyId) {
    return res.status(401).json({ error: 'Unauthorized. No Company Found' })
  }

  const form = formidable({
    maxFiles: 3,
    maxFileSize: 2048 * 1024, // 2mb
  })

  form.parse(req, async function (err, fields, files) {
    if (err) {
      return res.status(401).json({ error: err })
    }

    const candidateId = fields.candidateId?.[0]

    if (!candidateId) {
      return res.status(401).json({ error: 'No Candidate found' })
    }

    const fileFolders = ['avatar', 'cv', 'coverLetter']

    let filesUploaded

    if (files.file && files.file.length > 0) {
      const saveFiles = files.file.map(async (image, index) => {
        if (!fields.name?.[index] || !fileFolders.includes(fields.name[index])) {
          return {}
        }

        return saveFile(
          `assets/company-${companyId}/${fields.name[index]}`,
          fields.name[index],
          image
        )
      })

      filesUploaded = await Promise.all(saveFiles)
        .then((uploaded) => {
          console.log('All files saved successfully.')
          return uploaded.reduce((result, obj) => ({ ...result, ...obj }), {})
        })
        .catch((error) => {
          console.error('Error while saving files:', error)
        })
    }

    if (filesUploaded) {
      const saveAttachments = Object.entries(filesUploaded).map(async ([key, file]) => {
        const attachmentType: Record<string, string> = {
          avatar: 'candidateAvatar',
          cv: 'candidateCv',
          coverLetter: 'candidateCoverLetter',
        }

        if (key in attachmentType) {
          return prisma.attachment.create({
            data: {
              contentType: file.contentType,
              filename: file.filename,
              path: file.path,
              [attachmentType[key]]: { connect: { id: parseInt(candidateId) } },
            },
          })
        }

        return Promise.resolve()
      })

      const savedAttachments = await Promise.all(saveAttachments)
        .then((attachments) => {
          console.log('All attachments saved successfully.')
          return attachments.map((e) => {
            if (e) {
              return e.id
            }

            return null
          })
        })
        .catch((error) => {
          console.error('Error while saving attachments:', error)
          return null
        })

      if (savedAttachments) {
        return res.status(200).send(savedAttachments)
      }

      return res.status(400).json({ error: 'Failed attaching some files' })
    }

    return res.status(400).json({ error: 'No files uploaded' })
  })
}

const saveFile = async (path: string, key: string, file: formidable.File) => {
  const uploadDir = join(process.env.ROOT_DIR || process.cwd(), path)

  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const data = await readFile(file.filepath)
  const uniqueId = v4()
  const extension = file.originalFilename?.split('.').pop()

  return writeFile(`${uploadDir}/${uniqueId}.${extension}`, data)
    .then(() => {
      unlink(file.filepath)
    })
    .then(() => ({
      [key]: {
        contentType: key,
        filename: `${uniqueId}.${extension}`,
        path: path,
      },
    }))
    .catch(() => ({}))
}

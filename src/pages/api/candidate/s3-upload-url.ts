import { NextApiRequest, NextApiResponse } from 'next'

// Relevant imports
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { v4 } from 'uuid'
import { prisma } from '@/lib/prisma'

// Initialize S3Client instance
const client = new S3Client({})

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handlePOST(res, req)
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

const handlePOST = async (res: NextApiResponse, req: NextApiRequest) => {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const companyId = session.user.selectedCompany

    if (!companyId) {
      return res.status(401).json({ error: 'Unauthorized. No Company Found' })
    }

    const candidateId = req.body.candidateId

    if (!candidateId) {
      return res.status(401).json({ error: 'No Candidate found' })
    }

    const { fileName, fileType, fileSize } = await req.body

    if (!fileType || !fileName || !fileSize) {
      throw new Error('There was a problem with the file!')
    }

    const fieldInfo: Record<string, { destination: string; attachmentType: string }> = {
      avatar: {
        destination: 'avatar',
        attachmentType: 'candidateAvatar',
      },
      cv: {
        destination: 'cv',
        attachmentType: 'candidateCv',
      },
      coverLetter: {
        destination: 'cover-letter',
        attachmentType: 'candidateCoverLetter',
      },
    }
    const fieldData = fieldInfo[req.body.field]

    const uniqueId = v4()
    const extension = fileName.split('.').pop()
    const destination = fieldData?.destination ?? 'other'

    const fullFileName = `company-${companyId}/candidates/${destination}/${uniqueId}.${extension}`

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: fullFileName,
      ContentType: fileType,
      Bucket: process.env.AWS_BUCKET_NAME,
    })
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 })

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: fullFileName,
      Bucket: process.env.AWS_BUCKET_NAME,
    })
    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 })

    if (fieldData.attachmentType) {
      try {
        await prisma.attachment.create({
          data: {
            contentType: fileType,
            filename: fullFileName,
            size: fileSize,
            path: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fullFileName}`,
            [fieldData.attachmentType]: { connect: { id: parseInt(candidateId) } },
          },
        })
      } catch (error) {
        console.error('Error while saving attachments:', error)
      }
    }

    return res.status(200).json({ putUrl, getUrl })
  } catch (error) {
    console.log(error)
    throw error
  }
}

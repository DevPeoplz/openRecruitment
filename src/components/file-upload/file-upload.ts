export const uploadFileHelper = async (
  file: File,
  field: string,
  id: string,
  type = 'candidate'
) => {
  let query: { url: string; body: Record<string, string> } | null = null

  if (type === 'candidate') {
    query = { url: `/api/candidate/s3-upload-url`, body: { candidateId: id } }
  } else if (type === 'company') {
    query = { url: `/api/company/s3-upload-url`, body: { companyId: id } }
  }

  if (!query) throw new Error('Invalid type')

  try {
    // POST request to backend route handler
    const res = await fetch(query.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        field: field,
        ...query.body,
      }),
    })

    // Response includes a putUrl for upload and a getUrl for displaying a preview
    const { putUrl, getUrl } = await res.json()

    // Request made to putUrl, media file included in body
    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: 'PUT',
      headers: { 'Content-Type': file.type },
    })

    return { status: uploadResponse.ok, uploadedUrl: getUrl }
  } catch (error) {
    console.log(error)
    throw error
  }
}

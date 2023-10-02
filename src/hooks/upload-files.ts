import useSWR, { mutate } from 'swr'

export const useFileUpload = (url: string) => {
  const fetcher = async (url: string, formData: FormData) => {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('File upload failed')
    }

    return response.json()
  }

  const { data, error, mutate: revalidate } = useSWR(url, { fetcher })

  const uploadFile = async (formData: FormData) => {
    try {
      await fetcher(url, formData)
      // Invalidate and revalidate the SWR data to reflect the new state
      revalidate(url)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return {
    data,
    error,
    uploadFile,
    revalidate,
  }
}

import React from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/ui/loader'
import { JobView } from '@/components/views/jobs/job-view'

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    router.push('/jobs').then()
  }

  if (!id) {
    return <Loader />
  }

  return (
    <div className="flex h-full w-full justify-center bg-gray-200">
      <div className={'mt-5 h-full w-[1200px] max-w-[90vw] rounded bg-white'}>
        <JobView jobId={id as string} />
      </div>
    </div>
  )
}

Page.auth = {}
export default Page

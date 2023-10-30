import React from 'react'
import { useRouter } from 'next/router'
import CandidateView from '@/components/views/candidate/candidate-view'
import Loader from '@/components/ui/loader'

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    router.push('/candidates').then()
  }

  if (!id) {
    return <Loader />
  }

  return (
    <div className="flex h-full w-full justify-center bg-gray-200">
      <div className={'mt-5 h-full w-[1000px] max-w-[90vw] rounded bg-white'}>
        <CandidateView candidateId={id as string} />
      </div>
    </div>
  )
}

Page.auth = {}
export default Page

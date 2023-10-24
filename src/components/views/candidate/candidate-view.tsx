import React, { FC, Fragment, useMemo, useState } from 'react'
import Avatar from '@/components/ui/avatar'
import { ActivityTab, EmailTab, EvaluationTab, FileTab } from './tabs'
import EvaluationCandidate from './evaluation'
import Loader from '@/components/ui/loader'
import { useQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID } from '@/graphql-operations/queries'
import { find } from 'lodash'
import { AUDIT_LOGS } from '@/utils/mockdata'
import CopyLinkToClipboard from '@/components/ui/copy-link-to-clipboard'
import { normalizePath } from '@/components/utils/data-parsing'
import SimpleImageViewer from '@/components/ui/simple-image-viewer'
import Alert from '@/components/alert'
import OverviewTab from '@/components/views/candidate/tabs/overview-tab'

type Props = {
  candidateId?: string | number
}

const tabs = [
  {
    id: 'overview',
    name: 'Overview',
    component: OverviewTab,
  },
  {
    id: 'email',
    name: 'Email',
    component: EmailTab,
  },
  {
    id: 'evaluation',
    name: 'Evaluation',
    component: EvaluationTab,
  },
  {
    id: 'file',
    name: 'File',
    component: FileTab,
  },
  {
    id: 'activity',
    name: 'Activity',
    component: ActivityTab,
  },
]

export const CandidateContext = React.createContext<CandidateType | null>(null)

const CandidateView: FC<Props> = ({ candidateId }) => {
  const [tabSelected, setTabSelected] = useState('overview')

  const {
    loading: loadingCandidate,
    data: dataCandidate,
    refetch: refetchCandidate,
    error: errorCandidate,
  } = useQuery(GET_CANDIDATE_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { where: { id: parseInt(String(candidateId)) } },
  })

  const candidate = useMemo(
    () => queryToCandidate(dataCandidate?.findUniqueCandidate),
    [dataCandidate?.findUniqueCandidate]
  )

  if (loadingCandidate) return <Loader />
  if (!candidateId || !candidate || errorCandidate) return <Loader className="border-red-500" />

  const Tab = find(tabs, { id: tabSelected })?.component ?? Fragment
  const props = tabSelected === 'overview' ? { candidate: candidate, logs: AUDIT_LOGS } : {}

  const handleAvatarEdit = () => {
    Alert({ type: 'warning', message: 'This feature is not available yet' }).then()
  }

  return (
    <CandidateContext.Provider value={candidate}>
      <div className="flex h-full gap-2">
        <div className="w-100 p-2">
          <div className="flex items-center justify-between gap-16">
            <div className="flex items-center gap-2">
              <div className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                <SimpleImageViewer name={candidate.name} src={candidate.avatar}>
                  <Avatar name={candidate.name} src={candidate.avatar} />
                </SimpleImageViewer>
                <div
                  onClick={handleAvatarEdit}
                  className="absolute bottom-0 left-0 hidden h-2/6 w-full cursor-pointer items-center justify-center bg-primary-400/50 pb-1 font-bold text-primary-900 drop-shadow-white-sm group-hover:flex"
                >
                  <span>Edit</span>
                </div>
              </div>
              <div>
                <h3>{candidate.name}</h3>
                <p className="text-gray-600">Added manually by user 4 days ago</p>
              </div>
            </div>
            <CopyLinkToClipboard url={`${window.location.origin}/candidate/${candidateId}`} />
            <div>Following</div>
          </div>
          <div className="my-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`rounded-md px-4 py-2 ${tabSelected === tab.id ? 'bg-gray-200' : ''}`}
                onClick={() => setTabSelected(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {<Tab {...props} />}
        </div>

        <div className="w-[320px] bg-gray-300 p-2">
          <EvaluationCandidate />
        </div>
      </div>
    </CandidateContext.Provider>
  )
}

export default CandidateView

export type CandidateType = {
  id: number
  name: string
  email: string
  phone: string
  tagSource: {
    tag: {
      id: string
      name: string
    }[]
    source: {
      id: string
      name: string
    }[]
  }
  avatar?: string | null
  coverLetter?: string | null
  cv?: string | null
}
const queryToCandidate = (data: any): CandidateType | null => {
  if (!data) return null

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    tagSource: {
      tag: [
        { id: 'tag1', name: 'tag1' },
        { id: 'tag2', name: 'tag2' },
      ],
      source: [
        { id: 'source1', name: 'source1' },
        { id: 'source2', name: 'source2' },
      ],
    },
    avatar: data.avatar && data.avatar.path ? data.avatar.path : null,
    coverLetter: data.coverLetter && data.coverLetter.path ? data.coverLetter.path : null,
    cv: data.cv && data.cv.path ? data.cv.path : null,
  }
}

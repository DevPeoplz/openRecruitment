import React, { FC, Fragment, useEffect, useMemo, useState } from 'react'
import Avatar from '@/components/ui/avatar'
import { ActivityTab, EmailTab, EvaluationTab, FileTab } from './tabs'
import EvaluationCandidate from './evaluation'
import Loader from '@/components/ui/loader'
import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID } from '@/graphql-operations/queries'
import { find } from 'lodash'
import { AUDIT_LOGS } from '@/utils/mockdata'
import CopyLinkToClipboard from '@/components/ui/copy-link-to-clipboard'
import SimpleImageViewer from '@/components/ui/simple-image-viewer'
import Alert from '@/components/alert'
import OverviewTab from '@/components/views/candidate/tabs/overview-tab'
import { formatDistance } from 'date-fns'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { SIGNUP_MUTATION } from '@/graphql-operations/mutations'
import { UPDATE_CANDIDATE_MUTATION } from '@/graphql-operations/mutations/signup-candidate'
import { useFileUpload } from '@/hooks/upload-files'
import { CandidateUploadFile } from '@/components/file-upload/file-upload'
import { EditableFile } from '@/components/views/candidate/editable-file'

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
    id: 'file',
    name: 'File',
    component: FileTab,
  },
  {
    id: 'evaluation',
    name: 'Evaluation',
    component: EvaluationTab,
  },
  {
    id: 'email',
    name: 'Email',
    component: EmailTab,
  },
  {
    id: 'activity',
    name: 'Activity',
    component: ActivityTab,
  },
]

export const CandidateContext = React.createContext<
  | [
      CandidateType,
      (
        variables?: Partial<{ where: { id: number } }> | undefined
      ) => Promise<ApolloQueryResult<any>>
    ]
  | null
>(null)

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

  const createdAgo = useMemo(() => {
    if (candidate?.createdAt) {
      return formatDistance(new Date(candidate.createdAt), new Date(), { addSuffix: true })
    }

    return 0
  }, [candidate])

  if (loadingCandidate) return <Loader />
  if (!candidateId || !candidate || errorCandidate) return <Loader className="border-red-500" />

  const Tab = find(tabs, { id: tabSelected })?.component ?? Fragment
  const props = tabSelected === 'overview' ? { candidate: candidate, logs: AUDIT_LOGS } : {}

  return (
    <CandidateContext.Provider value={[candidate, refetchCandidate]}>
      <div className="flex h-auto min-h-full gap-2">
        <div className="w-100 p-2">
          <div className="flex items-center justify-between gap-16">
            <div className="flex items-center gap-2">
              <EditableFile field={'avatar'} />
              <div>
                <h3>{candidate.name}</h3>
                <p className="text-gray-600">{`Added ${createdAgo}`}</p>
              </div>
            </div>
            <CopyLinkToClipboard url={`${window.location.origin}/candidate/${candidateId}`} />
            <div>Following</div>
          </div>
          <div className="my-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`rounded-xl px-4 py-2 ${
                  tabSelected === tab.id ? 'bg-primary-50 text-white' : ''
                }`}
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
  firstName?: string
  lastName?: string
  email: string
  phone: string
  tags: {
    id: string
    name: string
  }[]
  source: {
    id: string
    name: string
  }
  avatar?: string | null
  coverLetter?: string | null
  cv?: string | null
  createdAt: string
  languages?: string[] | null
}
export const queryToCandidate = (data: any): CandidateType | null => {
  if (!data) return null

  return {
    id: data.id,
    name: data.firstName.split(' ')[0] + ' ' + data.lastName.split(' ')[0],
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    tags: [
      ...(data.tags ?? []).map((tagRow: { tag: { id: number; name: string } }) => {
        return {
          id: tagRow.tag.id,
          name: tagRow.tag.name,
        }
      }),
    ],
    source: data.source,
    avatar: data.avatar && data.avatar.path ? data.avatar.path : null,
    coverLetter: data.coverLetter && data.coverLetter.path ? data.coverLetter.path : null,
    cv: data.cv && data.cv.path ? data.cv.path : null,
    createdAt: data.createdAt,
    languages: data.languages,
  }
}

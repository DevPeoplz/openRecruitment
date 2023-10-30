import React, { FC, Fragment, useMemo, useState } from 'react'
import { ActivityTab, EmailTab, EvaluationTab, FileTab } from './tabs'
import { AddQuickEvaluation } from './evaluation'
import Loader from '@/components/ui/loader'
import { ApolloQueryResult, useQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID } from '@/graphql-operations/queries'
import { find } from 'lodash'
import { AUDIT_LOGS } from '@/utils/mockdata'
import { CopyLinkToClipboard, OpenNewTabCircleButton } from '@/components/ui/copy-link-to-clipboard'
import OverviewTab from '@/components/views/candidate/tabs/overview-tab'
import { formatDistance } from 'date-fns'
import { EditableFile } from '@/components/ui/edit/editable-file'
import { Tabs } from '@/components/ui/tabs'
import { CandidateJobsUpdate } from '@/components/views/candidate/right-sidebar-components'
import SimpleImageViewer from '@/components/ui/simple-image-viewer'
import Avatar from '@/components/ui/avatar'
import { useCandidateUpdateFile } from '@/hooks/candidate-view'

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
        variables?:
          | Partial<{
              where: { id: number }
            }>
          | undefined
      ) => Promise<ApolloQueryResult<any>>
    ]
  | null
>(null)

const CandidateView: FC<Props> = ({ candidateId }) => {
  const [tabSelected, setTabSelected] = useState('overview')
  const { handleFileUpload } = useCandidateUpdateFile(candidateId)

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
      <div className="flex h-full w-full gap-0.5">
        <div className="w-8/12 overflow-y-auto p-2">
          <div className="flex items-center justify-between gap-16">
            <div className="flex items-center gap-2">
              <div className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                <SimpleImageViewer name={candidate.name} src={candidate.avatar}>
                  <Avatar name={candidate.name} src={candidate.avatar} />
                </SimpleImageViewer>
                <EditableFile
                  labelClassName="absolute bottom-0 left-0 hidden h-2/6 w-full cursor-pointer items-center justify-center bg-primary-400/50 pb-1 font-bold text-primary-900 drop-shadow-white-sm group-hover:flex"
                  handleFileUpload={handleFileUpload('avatar')}
                >
                  <EditableFile.Loader>
                    <div className="absolute inset-0 flex items-center justify-center bg-primary-400/50">
                      <Loader size={'w-5 h-5'} fullScreen={false} />
                    </div>
                  </EditableFile.Loader>
                </EditableFile>
              </div>
              <div>
                <h3>{candidate.name}</h3>
                <p className="text-gray-600">{`Added ${createdAgo}`}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <CopyLinkToClipboard url={`${window.location.origin}/candidate/${candidateId}`} />
              <OpenNewTabCircleButton url={`${window.location.origin}/candidate/${candidateId}`} />
            </div>
            <div>Following</div>
          </div>
          <div className="mb-4 mt-2">
            <Tabs
              tabs={tabs}
              current={tabSelected}
              onTabClick={(tab) => setTabSelected(tab)}
            ></Tabs>
          </div>
          <div className={'w-full'}>{<Tab {...props} />}</div>
        </div>
        <div className="flex w-4/12 flex-col items-center gap-2 overflow-y-auto bg-gray-300 p-2">
          <AddQuickEvaluation />
          <hr className={'w-full border-white p-1'} />
          <CandidateJobsUpdate />
          <CandidateJobsUpdate field={'talentPool'} />
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
  birthday?: string | null
  skills?: string[] | null
  mainLanguage?: string | null
  educationLevel?: string | null
  salaryExpectation?: number | null
  socials?: string[] | null
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
    birthday: data.birthday,
    skills: data.skills,
    mainLanguage: data.mainLanguage,
    educationLevel: data.educationLevel,
    salaryExpectation: data.salaryExpectation,
    socials: data.socials,
  }
}

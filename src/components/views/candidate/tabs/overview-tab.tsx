import React, { useCallback, useContext } from 'react'
import { LogType } from '../../../modals/view-candidate-modal'
import {
  AcademicCapIcon,
  BanknotesIcon,
  CakeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  LanguageIcon,
  PhoneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
  CandidateContext,
  CandidateType,
  queryToCandidate,
} from '@/components/views/candidate/candidate-view'
import PDFViewer from '@/components/pdf-viewer'
import { useMutation } from '@apollo/client'
import { UPDATE_CANDIDATE_MUTATION } from '@/graphql-operations/mutations/signup-candidate'
import { Panel } from '@/components/ui/panel'
import { FieldsTable } from '@/components/ui/fields-table'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { parseGQLData } from '@/components/utils/data-parsing'
import { EditableFile } from '@/components/ui/edit/editable-file'
import { useLocalStorageState } from '@/hooks/localStorage'
import { Tooltip } from 'react-tooltip'
import { FaHandSparkles } from 'react-icons/fa'
import { useCandidateUpdateFile } from '@/hooks/candidate-view'
import {
  EditableFieldItemType,
  EditableFieldsValidTypes,
  generateFieldItemComponent,
  generateFullEditableCandidateTags,
} from '@/components/ui/edit/editable-field-generator'
import { CandidateCustomFieldsAsFieldItems } from '@/components/views/candidate/custom-field-display'

type Props = {
  logs?: LogType[]
}

const OverviewTab: React.FC<Props> = ({ logs }) => {
  const [candidate, refetchCandidate] = useContext(CandidateContext) ?? []
  const [extraFieldsOpen, setExtraFieldsOpen] = useLocalStorageState<boolean>(
    'candidate-view',
    'extraFieldsOpen',
    false
  )
  const [customFieldsOpen, setCustomFieldsOpen] = useLocalStorageState<boolean>(
    'candidate-view',
    'customFieldsOpen',
    false
  )

  const [customFieldsVisibility, setCustomFieldsVisibility] = useLocalStorageState<string[]>(
    'candidate-view',
    'custom-fields-visibility',
    []
  )
  const { handleFileUpload } = useCandidateUpdateFile(candidate?.id)

  const [updateCandidate, { data: dataCandidateUpdated, error: errorCandidateUpdated }] =
    useMutation(UPDATE_CANDIDATE_MUTATION)

  const dataBuilder = <T,>(field: string, value: T | undefined | null) => {
    switch (field) {
      case 'source':
        if ((value as ComboboxWithTagsProps['options'])[0]?.value) {
          return {
            referrer: {
              connect: {
                id: parseInt(String((value as ComboboxWithTagsProps['options'])[0]?.value)),
              },
            },
          }
        } else {
          return {
            referrer: {
              disconnect: null,
            },
          }
        }
      //break
      case 'tags':
        return {
          candidateTags: {
            deleteMany: {},
            create: [
              ...(value as ComboboxWithTagsProps['options']).map((tag) => ({
                tag: { connect: { id: parseInt(String(tag.value)) } },
              })),
            ],
          },
        }
      //break
      case 'email':
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'educationLevel':
      case 'salaryExpectation':
      case 'birthday':
      case 'mainLanguage':
        return { [field]: { set: value } }
      case 'languages':
      case 'skills':
      case 'socials':
        return { [field]: value }
    }

    return {}
  }

  const dataParser = <T,>(field: string, candidate: CandidateType | null): T | null => {
    if (!candidate) return null

    switch (field) {
      case 'source':
        return parseGQLData([candidate.source]) as T
      case 'tags':
        return parseGQLData(candidate.tags) as T
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'phone':
      case 'languages':
      case 'educationLevel':
      case 'salaryExpectation':
      case 'birthday':
      case 'skills':
      case 'mainLanguage':
      case 'socials':
        return candidate[field] as T
    }

    return null
  }

  const handleOnUpdate = useCallback(
    (typeName: keyof EditableFieldsValidTypes, field: string) => {
      return (value: EditableFieldsValidTypes[typeof typeName] | null | undefined) =>
        new Promise<EditableFieldsValidTypes[typeof typeName] | null | undefined>(
          (resolve, reject) => {
            if (!candidate?.id) {
              return reject()
            }

            updateCandidate({
              variables: {
                where: { id: parseInt(String(candidate.id)) },
                data: dataBuilder<EditableFieldsValidTypes[typeof typeName]>(field, value),
              },
            })
              .then((res) => {
                if (res.data.updateOneCandidate?.id) {
                  resolve(
                    dataParser<typeof typeName>(
                      field,
                      queryToCandidate(res.data.updateOneCandidate)
                    )
                  )
                } else {
                  reject()
                }
              })
              .catch(() => {
                reject()
              })
          }
        ).finally(() => {
          //return refetchCandidate()
        })
    },
    [candidate?.id, updateCandidate]
  )

  if (!candidate || !logs) return null

  const mainFields: EditableFieldItemType[] = [
    {
      key: 'firstName',
      value: candidate.firstName,
      icon: UserCircleIcon,
      title: 'First Name',
      type: 'string',
      inputType: 'text',
    },
    {
      key: 'lastName',
      value: candidate.lastName,
      icon: UserCircleIcon,
      title: 'Last Name',
      type: 'string',
      inputType: 'text',
    },
    {
      key: 'email',
      value: candidate.email,
      icon: EnvelopeIcon,
      title: 'Email',
      type: 'string',
      inputType: 'email',
    },
    {
      key: 'phone',
      value: candidate.phone,
      icon: PhoneIcon,
      title: 'Phone',
      type: 'string',
      inputType: 'text',
    },
    {
      key: 'languages',
      value: candidate.languages,
      icon: LanguageIcon,
      title: 'Languages',
      type: 'stringArray',
      inputType: 'stringArray',
    },
  ]

  const extraFields: EditableFieldItemType[] = [
    {
      key: 'educationLevel',
      value: candidate.educationLevel,
      icon: AcademicCapIcon,
      title: 'Education Level',
      type: 'string',
      inputType: 'select',
      fieldType: 'select',
      settings: {
        options: [
          { label: 'High School', value: 'highschool' },
          {
            label: 'Bachelor',
            value: 'bachelor',
          },
          { label: 'Master', value: 'master' },
          { label: 'PhD', value: 'phd' },
          { label: '', value: '' },
        ],
      },
    },
    {
      key: 'salaryExpectation',
      value: candidate.salaryExpectation,
      icon: BanknotesIcon,
      title: 'Salary Expectation',
      type: 'number',
      inputType: 'number',
      fieldType: 'currency',
    },
    {
      key: 'birthday',
      value: candidate.birthday,
      icon: CakeIcon,
      title: 'Birthday',
      type: 'string',
      inputType: 'date',
      fieldType: 'date-distance',
    },
    {
      key: 'skills',
      value: candidate.skills,
      icon: FaHandSparkles,
      title: 'Skills',
      type: 'stringArray',
      inputType: 'stringArray',
    },
    {
      key: 'mainLanguage',
      value: candidate.mainLanguage,
      icon: LanguageIcon,
      title: 'Main Language',
      type: 'string',
      inputType: 'text',
    },
    {
      key: 'socials',
      value: candidate.socials,
      icon: GlobeAltIcon,
      title: 'Socials',
      type: 'stringArray',
      inputType: 'stringArray',
    },
  ]

  return (
    <div className="flex flex-col gap-4 pb-5">
      <div className="flex items-center gap-2">
        <div className="z-10 flex flex-wrap gap-2">
          <b>Tags:</b>
          {generateFullEditableCandidateTags('tags', candidate.tags, handleOnUpdate)}
        </div>
      </div>
      <Panel>
        <Panel.Header>Information</Panel.Header>
        <Panel.Body className={'relative max-h-[600px] overflow-y-auto !p-0'}>
          <div className="relative">
            <FieldsTable>
              {mainFields.map((field) => generateFieldItemComponent(field, handleOnUpdate))}
            </FieldsTable>
            <div
              className="absolute left-1/4 z-50 -mt-3 flex h-5 w-5 cursor-pointer items-center rounded-full border border-primary-500 bg-primary-50/50 font-bold text-primary-500"
              onClick={() => {
                setExtraFieldsOpen(!extraFieldsOpen)
              }}
              data-tooltip-content={extraFieldsOpen ? 'Hide Extra fields' : 'Show Extra fields'}
              data-tooltip-id={'extra-fields'}
            >
              <Tooltip id={'extra-fields'} />
              {extraFieldsOpen ? (
                <ChevronUpIcon className={'z-30 h-full w-full'}></ChevronUpIcon>
              ) : (
                <ChevronDownIcon className={'z-30 h-full w-full'}></ChevronDownIcon>
              )}
            </div>
            {extraFieldsOpen && (
              <FieldsTable>
                {extraFields.map((field) => generateFieldItemComponent(field, handleOnUpdate))}
              </FieldsTable>
            )}
          </div>
          <div
            className="absolute left-1/3 z-50 -mt-3 flex h-5 w-5 cursor-pointer items-center rounded-full border border-yellow-500 bg-yellow-50/50 font-bold text-yellow-500"
            onClick={() => {
              setCustomFieldsOpen(!customFieldsOpen)
            }}
            data-tooltip-content={customFieldsOpen ? 'Hide Custom fields' : 'Show Custom fields'}
            data-tooltip-id={'custom-fields'}
          >
            <Tooltip id={'custom-fields'} />
            {customFieldsOpen ? (
              <ChevronUpIcon className={'z-30 h-full w-full'}></ChevronUpIcon>
            ) : (
              <ChevronDownIcon className={'z-30 h-full w-full'}></ChevronDownIcon>
            )}
          </div>
          <div className={'h-3 w-full bg-gray-200'}></div>
          {customFieldsOpen && (
            <>
              <CandidateCustomFieldsAsFieldItems candidateId={candidate?.id} />
              <div className={'h-3 w-full bg-gray-200'}></div>
            </>
          )}
        </Panel.Body>
      </Panel>
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <b>Source:</b>
          {generateFullEditableCandidateTags('source', [candidate.source], handleOnUpdate)}
        </div>
      </div>
      <Panel>
        <Panel.Header>Recent Activity</Panel.Header>
        <Panel.Body></Panel.Body>
      </Panel>
      <Panel>
        <Panel.Header>Curriculum</Panel.Header>
        <Panel.Body>
          <PDFViewer file={candidate.cv}>
            <PDFViewer.ToolbarItem>
              <EditableFile
                label={candidate.cv ? 'Edit' : 'Upload'}
                handleFileUpload={handleFileUpload('cv')}
                fileType={'application/pdf'}
              />
            </PDFViewer.ToolbarItem>
          </PDFViewer>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default OverviewTab

import React, { useCallback, useContext } from 'react'
import { LogType } from '../../../modals/view-candidate-modal'
import {
  AcademicCapIcon,
  BanknotesIcon,
  CakeIcon,
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  LanguageIcon,
  ListBulletIcon,
  PhoneIcon,
  PlusIcon,
  PresentationChartLineIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
  CandidateContext,
  CandidateType,
  queryToCandidate,
} from '@/components/views/candidate/candidate-view'
import PDFViewer from '@/components/pdf-viewer'
import { EditableField } from '@/components/views/candidate/editable-fields'
import { useMutation } from '@apollo/client'
import { UPDATE_CANDIDATE_MUTATION } from '@/graphql-operations/mutations/signup-candidate'
import { Panel } from '@/components/ui/panel'
import { FieldsTable } from '@/components/ui/fields-table'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { parseGQLData } from '@/components/utils/data-parsing'
import { EditableFile } from '@/components/views/candidate/editable-file'
import { useLocalStorageState } from '@/hooks/localStorage'
import { Tooltip } from 'react-tooltip'
import { formatDistance } from 'date-fns'
import { SimpleTags } from '@/components/ui/simple-tags'
import { FaHandSparkles } from 'react-icons/fa'

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

  const [updateCandidate, { data: dataCandidateUpdated, error: errorCandidateUpdated }] =
    useMutation(UPDATE_CANDIDATE_MUTATION)

  const dataBuilder = <T,>(field: string, value: T | undefined | null) => {
    switch (field) {
      case 'sources':
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
      case 'sources':
        return parseGQLData([candidate.source]) as T
      case 'tags':
        return parseGQLData(candidate.tags) as T
      case 'email':
      case 'firstName':
      case 'lastName':
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
    <T,>({ field }: { field: string }) => {
      return (value: T | null | undefined) =>
        new Promise<T | null | undefined>((resolve, reject) => {
          console.log(value)
          console.log(typeof value)
          if (!candidate?.id) {
            return reject()
          }

          updateCandidate({
            variables: {
              where: { id: parseInt(String(candidate.id)) },
              data: dataBuilder<T>(field, value),
            },
          })
            .then((res) => {
              if (res.data.updateOneCandidate?.id) {
                resolve(dataParser<T>(field, queryToCandidate(res.data.updateOneCandidate)))
              } else {
                reject()
              }
            })
            .catch(() => {
              reject()
            })
        }).finally(() => {
          //return refetchCandidate()
        })
    },
    [candidate?.id, updateCandidate]
  )

  if (!candidate || !logs) return null

  return (
    <div className="flex flex-col gap-4 pb-5">
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <b>Tags:</b>
          <EditableField<ComboboxWithTagsProps['options']>
            type="tags"
            initialValue={parseGQLData(candidate.tags)}
            onSave={handleOnUpdate<ComboboxWithTagsProps['options']>({ field: 'tags' })}
            editVisible={true}
          >
            <EditableField.Icon>
              <PlusIcon className="h-5 w-5 rounded-sm border" />
            </EditableField.Icon>
            <div className={'flex max-w-full flex-wrap gap-1'}>
              {candidate.tags.map((tag) => (
                <div
                  key={`tags-${tag.id}`}
                  className="flex justify-between gap-2 rounded border p-1 px-2 text-sm"
                >
                  <p>{tag.name}</p>
                </div>
              ))}
            </div>
          </EditableField>
        </div>
      </div>
      <Panel>
        <Panel.Header>Information</Panel.Header>
        <Panel.Body className={'relative z-10 max-h-[600px] overflow-y-auto !p-0'}>
          <div className="relative">
            <FieldsTable>
              <FieldsTable.Item>
                <FieldsTable.Item.Icon>
                  <UserCircleIcon className={'h-5 w-5'} />
                </FieldsTable.Item.Icon>
                <FieldsTable.Item.Key>
                  <p>First Name</p>
                </FieldsTable.Item.Key>
                <FieldsTable.Item.Value>
                  <EditableField<string>
                    type="text"
                    initialValue={candidate.firstName}
                    onSave={handleOnUpdate<string>({ field: 'firstName' })}
                  >
                    <p>{candidate.firstName}</p>
                  </EditableField>
                </FieldsTable.Item.Value>
              </FieldsTable.Item>
              <FieldsTable.Item>
                <FieldsTable.Item.Icon>
                  <UserCircleIcon className={'h-5 w-5'} />
                </FieldsTable.Item.Icon>
                <FieldsTable.Item.Key>
                  <p>Last Name</p>
                </FieldsTable.Item.Key>
                <FieldsTable.Item.Value>
                  <EditableField<string>
                    type="text"
                    initialValue={candidate.lastName}
                    onSave={handleOnUpdate<string>({ field: 'lastName' })}
                  >
                    <p>{candidate.lastName}</p>
                  </EditableField>
                </FieldsTable.Item.Value>
              </FieldsTable.Item>
              <FieldsTable.Item>
                <FieldsTable.Item.Icon>
                  <EnvelopeIcon className={'h-5 w-5'} />
                </FieldsTable.Item.Icon>
                <FieldsTable.Item.Key>
                  <p>Email</p>
                </FieldsTable.Item.Key>
                <FieldsTable.Item.Value>
                  <EditableField<string>
                    type="email"
                    initialValue={candidate.email}
                    onSave={handleOnUpdate<string>({ field: 'email' })}
                  >
                    <p>{candidate.email}</p>
                  </EditableField>
                </FieldsTable.Item.Value>
              </FieldsTable.Item>
              <FieldsTable.Item>
                <FieldsTable.Item.Icon>
                  <PhoneIcon className="h-5 w-5" />
                </FieldsTable.Item.Icon>
                <FieldsTable.Item.Key>
                  <p>Phone</p>
                </FieldsTable.Item.Key>
                <FieldsTable.Item.Value>
                  <EditableField<string>
                    type="text"
                    initialValue={candidate.phone}
                    onSave={handleOnUpdate<string>({ field: 'phone' })}
                  >
                    <p>{candidate.phone}</p>
                  </EditableField>
                </FieldsTable.Item.Value>
              </FieldsTable.Item>
              <FieldsTable.Item>
                <FieldsTable.Item.Icon>
                  <LanguageIcon className="h-5 w-5" />
                </FieldsTable.Item.Icon>
                <FieldsTable.Item.Key>
                  <p>Languages</p>
                </FieldsTable.Item.Key>
                <FieldsTable.Item.Value>
                  <EditableField<string[]>
                    type="stringArray"
                    initialValue={
                      candidate.languages?.length && candidate.languages.length > 0
                        ? candidate.languages
                        : null
                    }
                    onSave={handleOnUpdate<string[]>({ field: 'languages' })}
                  >
                    <div className={'flex max-w-full flex-wrap gap-1'}>
                      <SimpleTags list={candidate.languages} keyPrefix="languages" />
                    </div>
                  </EditableField>
                </FieldsTable.Item.Value>
              </FieldsTable.Item>
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
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <AcademicCapIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Education Level</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<string>
                      type="text"
                      initialValue={candidate.educationLevel}
                      onSave={handleOnUpdate<string>({ field: 'educationLevel' })}
                    >
                      <p>{candidate.educationLevel}</p>
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <BanknotesIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Salary Expectation</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<number>
                      type="number"
                      initialValue={candidate.salaryExpectation}
                      onSave={handleOnUpdate<number>({ field: 'salaryExpectation' })}
                    >
                      <p>
                        {candidate.salaryExpectation
                          ? candidate.salaryExpectation.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                            })
                          : 0}
                      </p>
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <CakeIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>BirthDay</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<string>
                      type="datetime"
                      initialValue={candidate.birthday}
                      onSave={handleOnUpdate<string>({ field: 'birthday' })}
                    >
                      <p className={'leading-none'}>
                        <span>
                          {candidate.birthday
                            ? new Date(candidate.birthday).toLocaleDateString()
                            : ''}
                        </span>
                        {candidate.birthday && (
                          <span className={'ml-auto pl-1 text-xs leading-none'}>
                            ({formatDistance(new Date(candidate.birthday), new Date())})
                          </span>
                        )}
                      </p>
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <FaHandSparkles className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Skills</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<string[]>
                      type="stringArray"
                      initialValue={
                        candidate.skills && candidate.skills.length > 0 ? candidate.skills : null
                      }
                      onSave={handleOnUpdate<string[]>({ field: 'skills' })}
                    >
                      <SimpleTags list={candidate.skills} keyPrefix="skills" />
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <LanguageIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Main Language</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<string>
                      type="text"
                      initialValue={candidate.mainLanguage}
                      onSave={handleOnUpdate<string>({ field: 'mainLanguage' })}
                    >
                      <p>{candidate.mainLanguage}</p>
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <GlobeAltIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Socials</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <EditableField<string[]>
                      type="stringArray"
                      initialValue={
                        candidate.socials && candidate.socials.length > 0 ? candidate.socials : null
                      }
                      onSave={handleOnUpdate<string[]>({ field: 'socials' })}
                    >
                      <SimpleTags list={candidate.socials} keyPrefix={'socials'}></SimpleTags>
                    </EditableField>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
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
              <FieldsTable>
                <FieldsTable.Item>
                  <FieldsTable.Item.Key>
                    <p>
                      <b>Custom Fields:</b>
                    </p>
                  </FieldsTable.Item.Key>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <DocumentTextIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Custom String</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <p>Custom String Value</p>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <CalculatorIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Custom Number</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <p>Custom Number Value</p>
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
                <FieldsTable.Item>
                  <FieldsTable.Item.Icon>
                    <ListBulletIcon className={'h-5 w-5'} />
                  </FieldsTable.Item.Icon>
                  <FieldsTable.Item.Key>
                    <p>Custom String Array</p>
                  </FieldsTable.Item.Key>
                  <FieldsTable.Item.Value>
                    <SimpleTags list={['Custom', 'String', 'Array']} keyPrefix="custom-array" />
                  </FieldsTable.Item.Value>
                </FieldsTable.Item>
              </FieldsTable>
              <div className={'h-3 w-full bg-gray-200'}></div>
            </>
          )}
        </Panel.Body>
      </Panel>
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <b>Source:</b>
          <EditableField<ComboboxWithTagsProps['options']>
            type="sources"
            initialValue={parseGQLData([candidate.source])}
            onSave={handleOnUpdate<ComboboxWithTagsProps['options']>({ field: 'sources' })}
            editVisible={true}
          >
            <EditableField.Icon>
              <PlusIcon className="h-5 w-5 rounded-sm border" />
            </EditableField.Icon>
            <>
              {candidate.source && (
                <div
                  key={`source-${candidate.source.id}`}
                  className="flex justify-between gap-2 rounded border p-1 px-2 text-sm"
                >
                  <p>{candidate.source.name}</p>
                </div>
              )}
            </>
          </EditableField>
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
              <EditableFile field="cv" file={candidate.cv} />
            </PDFViewer.ToolbarItem>
          </PDFViewer>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default OverviewTab

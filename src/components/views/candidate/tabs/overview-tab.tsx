import React, { useCallback, useContext } from 'react'
import { LogType } from '../../../modals/view-candidate-modal'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { LanguageIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/20/solid'
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

type Props = {
  logs?: LogType[]
}

const OverviewTab: React.FC<Props> = ({ logs }) => {
  const [candidate, refetchCandidate] = useContext(CandidateContext) ?? []

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
        return { [field]: { set: value } }
      case 'languages':
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
        return candidate[field] as T
    }

    return null
  }

  const handleOnUpdate = useCallback(
    <T,>({ field }: { field: string }) => {
      return (value: T | null | undefined) =>
        new Promise<T | null | undefined>((resolve, reject) => {
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
    <div className="flex flex-col gap-4 ">
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
        <Panel.Body className={'!border-none !p-0'}>
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
                    {candidate.languages?.map((lang) => (
                      <div
                        key={`language-${lang}`}
                        className="flex justify-between gap-2 rounded border p-1 px-2 text-sm"
                      >
                        <p>{lang}</p>
                      </div>
                    ))}
                  </div>
                </EditableField>
              </FieldsTable.Item.Value>
            </FieldsTable.Item>
          </FieldsTable>
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

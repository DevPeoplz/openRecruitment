import { useLocalStorageState } from '@/hooks/localStorage'
import {
  EditableFieldItemType,
  EditableFieldsValidTypes,
  generateFieldItemComponent,
} from '@/components/ui/edit/editable-field-generator'
import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  GET_AVAILABLE_CUSTOM_FIELDS,
  GET_CANDIDATE_BY_ID_VISIBLE_CUSTOM_FIELDS,
  get_candidate_by_id_visible_custom_fields_variables,
} from '@/graphql-operations/queries/dashboard-candidates'
import {
  CalculatorIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  ListBulletIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'
import {
  UPSERT_CANDIDATE_CUSTOM_FIELDS_MUTATION,
  upsert_one_candidate_custom_fields_variables,
} from '@/graphql-operations/mutations/signup-candidate'
import { FieldsTable } from '@/components/ui/fields-table'
import { BtnIconCombobox } from '@/components/ui/btn-icon-combobox'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { List, uniq } from 'lodash'

type CustomFieldsAsFieldItemsProps = {
  candidateId: string | number | null
}

type CustomFieldAvailableTypes =
  | 'string'
  | 'int'
  | 'date'
  | 'datetime'
  | 'select'
  | 'stringArray'
  | 'currency'

const parseCFValue = (type: keyof EditableFieldsValidTypes, value: string | null | undefined) => {
  switch (type) {
    case 'string':
      return value ? (value === '' ? null : value) : null
    case 'boolean':
      return value === 'true'
    case 'number':
      return value ? parseInt(value) : null
    case 'stringArray':
    case 'numberArray':
    case 'booleanArray':
    case 'selectOptions':
      return value ? JSON.parse(value) : null
    default:
      return null
  }
}

const encodeCFValue = (type: keyof EditableFieldsValidTypes, value: any) => {
  switch (type) {
    case 'string':
      return value === '' ? null : value
    case 'boolean':
      return value ? 'true' : 'false'
    case 'number':
      return value ? String(value) : null
    case 'stringArray':
    case 'numberArray':
    case 'booleanArray':
    case 'selectOptions':
      return value ? JSON.stringify(value) : null
    default:
      return null
  }
}

const encodeCFFieldItemKey = (id: number, type: keyof EditableFieldsValidTypes) => {
  return `custom-field-%%${id}%%-%%${type}%%`
}

const parseCFFieldItemKey = (key: string) => {
  const keyParts = key.split('%%')
  return {
    id: parseInt(keyParts[1]),
    type: keyParts[3] as keyof EditableFieldsValidTypes,
  }
}

export const CandidateCustomFieldsAsFieldItems: React.FC<CustomFieldsAsFieldItemsProps> = ({
  candidateId,
}) => {
  const [customFieldsVisibility, setCustomFieldsVisibility] = useLocalStorageState<string[]>(
    'candidate-view',
    'custom-fields-visibility',
    []
  )

  const { data: dataAvailableCustomFields } = useQuery(GET_AVAILABLE_CUSTOM_FIELDS, {
    fetchPolicy: 'cache-and-network',
  })

  const { data: dataCandidateCustomFields } = useQuery(GET_CANDIDATE_BY_ID_VISIBLE_CUSTOM_FIELDS, {
    fetchPolicy: 'cache-and-network',
    variables: get_candidate_by_id_visible_custom_fields_variables(
      candidateId,
      customFieldsVisibility
    ),
  })

  const customFieldsVisibilityAsOptions = useMemo(() => {
    return customFieldsVisibility.map((cf) => ({
      label:
        dataAvailableCustomFields?.customFields?.find(
          (cfAval: { key: string }) => cfAval.key === cf
        )?.settings?.label ?? cf,
      value: cf,
    }))
  }, [customFieldsVisibility, dataAvailableCustomFields?.customFields])

  const availableCustomFieldsAsOptions = useMemo(() => {
    return dataAvailableCustomFields?.customFields?.map(
      (cf: { settings: { label: any }; key: any }) => ({
        label: cf.settings?.label ?? cf.key,
        value: cf.key,
      })
    )
  }, [dataAvailableCustomFields?.customFields])

  const handleCustomFieldsVisibilityChange = useCallback(
    (options: string[] | null | undefined) => {
      setCustomFieldsVisibility(uniq(options))
    },
    [setCustomFieldsVisibility]
  )

  const [upsertCandidateCustomFields] = useMutation(UPSERT_CANDIDATE_CUSTOM_FIELDS_MUTATION)

  const handleOnUpdate = useCallback(
    (typeName: keyof EditableFieldsValidTypes, field: string) => {
      return (value: EditableFieldsValidTypes[typeof typeName] | null | undefined) =>
        new Promise<EditableFieldsValidTypes[typeof typeName] | null | undefined>(
          (resolve, reject) => {
            if (!candidateId) {
              return reject()
            }

            upsertCandidateCustomFields({
              variables: upsert_one_candidate_custom_fields_variables(
                candidateId,
                parseCFFieldItemKey(field).id,
                encodeCFValue(parseCFFieldItemKey(field).type, value),
                customFieldsVisibility
              ),
            })
              .then((res) => {
                if (res.data.candidateCFs?.id) {
                  resolve(
                    parseCFValue(
                      parseCFFieldItemKey(field).type,
                      res.data.candidateCFs?.candidateCustomFields.find(
                        (cf: { customField: { id: string | number } }) =>
                          String(cf.customField.id) === String(parseCFFieldItemKey(field).id)
                      )?.value
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
    [candidateId, customFieldsVisibility, upsertCandidateCustomFields]
  )

  const customFieldsGeneratorData: EditableFieldItemType[] = useMemo(() => {
    if (!dataAvailableCustomFields?.customFields) return []
    if (!dataCandidateCustomFields?.candidateCFs) return []

    const availableCFS = dataAvailableCustomFields?.customFields
    const candidateCFS = dataCandidateCustomFields?.candidateCFs

    return [
      ...customFieldsVisibility.map((customFieldKey) => {
        const customFieldSettings = availableCFS.find(
          (cf: { key: string }) => cf.key === customFieldKey
        )
        const customFieldCandidateData = candidateCFS.candidateCustomFields?.find(
          (cf: { customField: { key: string } }) => cf.customField.key === customFieldKey
        )

        if (!customFieldSettings) return null

        const customFieldTypes: Record<
          CustomFieldAvailableTypes,
          {
            type: keyof EditableFieldsValidTypes
            inputType: string
            icon: EditableFieldItemType['icon']
            fieldType?: string
          }
        > = {
          string: { type: 'string', inputType: 'text', icon: DocumentTextIcon },
          int: { type: 'number', inputType: 'number', icon: CalculatorIcon },
          date: { type: 'string', inputType: 'date', icon: CalendarIcon },
          datetime: { type: 'string', inputType: 'datetime', icon: CalendarDaysIcon },
          select: { type: 'string', inputType: 'select', icon: QueueListIcon },
          stringArray: { type: 'stringArray', inputType: 'stringArray', icon: ListBulletIcon },
          currency: {
            type: 'number',
            inputType: 'number',
            fieldType: 'currency',
            icon: CurrencyDollarIcon,
          },
        }

        if (!(customFieldSettings.type in customFieldTypes)) return null

        const customFieldTypeSettings =
          customFieldTypes[customFieldSettings.type as CustomFieldAvailableTypes]

        return {
          key: encodeCFFieldItemKey(customFieldSettings.id, customFieldTypeSettings.type),
          value: parseCFValue(customFieldTypeSettings.type, customFieldCandidateData?.value),
          icon: customFieldTypeSettings.icon,
          title: customFieldSettings?.settings?.label ?? customFieldSettings.key,
          type: customFieldTypeSettings.type,
          inputType: customFieldTypeSettings.inputType,
          fieldType: customFieldTypeSettings.fieldType ?? customFieldTypeSettings.inputType,
          ...(customFieldTypeSettings.inputType === 'select' &&
          customFieldSettings?.settings?.options
            ? { settings: customFieldSettings.settings.options }
            : {}),
        }
      }),
    ].filter((e) => e) as EditableFieldItemType[]
  }, [
    customFieldsVisibility,
    dataAvailableCustomFields?.customFields,
    dataCandidateCustomFields?.candidateCFs,
  ])

  return (
    <>
      <FieldsTable>
        <FieldsTable.Item>
          <FieldsTable.Item.Key>
            <p>
              <b>Custom Fields:</b>
            </p>
          </FieldsTable.Item.Key>
          <FieldsTable.Item.Value>
            <div className="flex flex-wrap items-center gap-2">
              <BtnIconCombobox
                comboboxType="checks"
                icon={EyeIcon}
                hideBtnAfterClick={false}
                btnClassName={'mt-1 rounded border border-gray-400 p-1'}
                placeholderText={'Show Custom Fields...'}
                initialSelection={customFieldsVisibility}
                options={availableCustomFieldsAsOptions}
                onSelectedOptionsChange={handleCustomFieldsVisibilityChange}
              />
            </div>
          </FieldsTable.Item.Value>
        </FieldsTable.Item>
        {customFieldsGeneratorData.map((customField) => {
          return generateFieldItemComponent(customField, handleOnUpdate)
        })}
      </FieldsTable>
    </>
  )
}

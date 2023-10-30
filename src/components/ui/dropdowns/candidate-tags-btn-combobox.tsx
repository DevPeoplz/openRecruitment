import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADD_CANDIDATE_DROPDOWNS } from '@/graphql-operations/queries'
import { parseGQLData } from '@/components/utils/data-parsing'

type GQLBtnComboboxProps = {
  attribute: string
  placeholder?: string
  initialSelection?: ComboboxWithTagsProps['options']
  onSelectionChange?: ComboboxWithTagsProps['onSelectedOptionsChange']
}

export const CandidateTagsBtnCombobox: React.FC<GQLBtnComboboxProps> = ({
  initialSelection = [],
  onSelectionChange,
  attribute,
  placeholder = 'Select a value...',
}) => {
  const { data: dataDropdown, loading: loadingDropdown } = useQuery(GET_ADD_CANDIDATE_DROPDOWNS, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <ComboboxWithTags
      options={parseGQLData(dataDropdown && dataDropdown[attribute])}
      initialSelection={initialSelection}
      onSelectedOptionsChange={onSelectionChange}
      placeholder={placeholder}
    />
  )
}

import React, { ReactNode, useRef, useState } from 'react'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/20/solid'
import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { ComboboxWithChecks, ComboboxWithChecksProps } from '@/components/ui/combobox-with-checks'

type BtnIconTypesProps = {
  tags: ComboboxWithTagsProps
  checks: ComboboxWithChecksProps
}

type BtnIconComboboxProps = {
  options: BtnIconTypesProps[keyof BtnIconTypesProps]['options']
  onSelectedOptionsChange?: BtnIconTypesProps[keyof BtnIconTypesProps]['onSelectedOptionsChange']
  hideBtnAfterClick?: boolean
  btnText?: string | ReactNode
  placeholderText?: string
  btnClassName?: string
  spanClassName?: string
  plusClassName?: string
  icon?: React.ElementType
  initialSelection?: BtnIconTypesProps[keyof BtnIconTypesProps]['initialSelection']
  comboboxType?: keyof BtnIconTypesProps
}

export const BtnIconCombobox: React.FC<BtnIconComboboxProps> = ({
  options,
  hideBtnAfterClick = true,
  onSelectedOptionsChange,
  btnText,
  placeholderText = 'Select an option...',
  btnClassName = 'rounded border border-gray-400 p-1',
  spanClassName = 'flex w-24 items-center gap-2 rounded border border-gray-400 p-1',
  plusClassName = 'h-3 w-3',
  icon: Icon = PlusIcon,
  comboboxType = 'tags',
  initialSelection = [],
}) => {
  const [btnClicked, setBtnClicked] = useState(false)
  const comboBtnRef = useRef<HTMLButtonElement>(null)
  const ComboboxSelected = comboboxType === 'tags' ? ComboboxWithTags : ComboboxWithChecks

  const handleBtnClick = () => () => {
    setBtnClicked((prev) => {
      if (!prev) {
        comboBtnRef.current?.click()
      }

      return !prev
    })
  }

  let btnIconComponent = <Icon className={plusClassName} />

  if (btnText) {
    btnIconComponent = (
      <span className={spanClassName}>
        {btnIconComponent}
        <p>{btnText}</p>
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        className={clsx(
          btnClassName,
          btnClicked && hideBtnAfterClick && options.length > 0 && 'hidden'
        )}
        onClick={handleBtnClick()}
      >
        {btnIconComponent}
      </button>
      {btnClicked &&
        (comboboxType === 'tags' ? (
          <ComboboxWithTags
            options={options}
            comboBtnRef={comboBtnRef}
            onSelectedOptionsChange={
              onSelectedOptionsChange as BtnIconTypesProps[typeof comboboxType]['onSelectedOptionsChange']
            }
            placeholder={placeholderText}
            initialSelection={
              initialSelection as BtnIconTypesProps[typeof comboboxType]['initialSelection']
            }
          />
        ) : (
          <ComboboxWithChecks
            options={options as BtnIconTypesProps[typeof comboboxType]['options']}
            comboBtnRef={comboBtnRef}
            onSelectedOptionsChange={
              onSelectedOptionsChange as BtnIconTypesProps[typeof comboboxType]['onSelectedOptionsChange']
            }
            placeholder={placeholderText}
            initialSelection={
              initialSelection as BtnIconTypesProps[typeof comboboxType]['initialSelection']
            }
          />
        ))}
    </>
  )
}

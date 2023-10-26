import React, { ReactNode, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/20/solid'
import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'

type BtnIconComboboxProps = {
  options: ComboboxWithTagsProps['options']
  onSelectedOptionsChange?: ComboboxWithTagsProps['onSelectedOptionsChange']
  hideBtnAfterClick?: boolean
  btnText?: string | ReactNode
  placeholderText?: string
  btnClassName?: string
  spanClassName?: string
  plusClassName?: string
  icon?: React.ElementType
  initialSelection?: ComboboxWithTagsProps['options']
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
}) => {
  const [btnClicked, setBtnClicked] = useState(false)
  const comboBtnRef = useRef<HTMLButtonElement>(null)

  const handleBtnClick = () => () => {
    setBtnClicked(true)
  }

  useEffect(() => {
    if (btnClicked) {
      comboBtnRef.current?.click()
    }
  }, [btnClicked])

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
      {btnClicked && (
        <ComboboxWithTags
          options={options}
          comboBtnRef={comboBtnRef}
          onSelectedOptionsChange={onSelectedOptionsChange}
          placeholder={placeholderText}
        />
      )}
    </>
  )
}

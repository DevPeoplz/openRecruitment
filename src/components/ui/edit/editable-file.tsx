import React, { ReactNode, useId, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getChildrenOnDisplayName } from '@/components/utils'
import clsx from 'clsx'
import { childrenRenderer } from '@/components/utils/basic'

type EditableFileProps = {
  fileType?: string
  label?: string | null
  loaderClassName?: string
  labelClassName?: string
  handleFileUpload: (x: File | undefined) => Promise<unknown>
  children?: ReactNode
}

type EditableFileComponentsType = {
  Loader?: typeof EditableFileLoader
}

export const EditableFile = ({
  fileType = 'image/png, image/jpeg',
  label = 'Edit',
  loaderClassName = '!border-primary-200',
  labelClassName,
  handleFileUpload,
  children,
}: EditableFileComponentsType & EditableFileProps) => {
  const [updating, setUpdating] = useState(false)
  const generatedId = useId()

  const EditableFileLoader = getChildrenOnDisplayName(children, 'EditableFile.Loader')
  const loaderComponent =
    EditableFileLoader && EditableFileLoader.length > 0 ? (
      <>{EditableFileLoader}</>
    ) : (
      <Loader size={'w-5 h-5'} className={loaderClassName} fullScreen={false} />
    )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    setUpdating(true)

    handleFileUpload(file).finally(() => {
      setUpdating(false)
    })
  }

  return (
    <>
      {updating ? (
        loaderComponent
      ) : (
        <div className={clsx(labelClassName)}>
          <label htmlFor={generatedId} className={'cursor-pointer'}>
            {label}
          </label>
          <input
            type="file"
            id={generatedId}
            className="hidden"
            accept={fileType}
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  )
}

const EditableFileLoader = childrenRenderer('EditableFile.Loader')
EditableFile.Loader = EditableFileLoader

import React, { useId } from 'react'
import { SimpleTags } from '@/components/ui/simple-tags'
import { formatDistance } from 'date-fns'
import clsx from 'clsx'

interface FieldRendererType<T> {
  className?: string
  type?: string
  value: T | null | undefined
  settings?: {
    options?: {
      label: string
      value: string
    }[]
  }
}

export const FieldRenderer = <T,>({
  className,
  type = 'text',
  value,
  settings,
}: FieldRendererType<T>) => {
  const generatedId = useId()

  let fieldComponent: React.ReactNode = null

  switch (type) {
    case 'stringArray':
      fieldComponent = (
        <SimpleTags
          className={className}
          list={value as string[]}
          keyPrefix={`fieldRenderer-${generatedId}`}
        />
      )
      break
    case 'select':
      fieldComponent = settings?.options ? (
        <p className={className}>
          {settings.options.find((op) => op.value === value)?.label ?? (value as string)}
        </p>
      ) : (
        <p className={className}>{value as string}</p>
      )
      break
    case 'date':
    case 'datetime':
    case 'datetime-local':
    case 'date-distance':
    case 'datetime-distance':
      fieldComponent = (
        <p className={clsx(className, 'leading-none')}>
          <span>
            {value ? new Date(value as string).toLocaleDateString() : ''}
            {value && type.startsWith('datetime')
              ? ` ${new Date(value as string).toLocaleTimeString()}`
              : ''}
          </span>
          {['date-distance', 'datetime-distance'].includes(type) && value && (
            <span className={'ml-auto pl-1 text-xs leading-none'}>
              ({formatDistance(new Date(value as string), new Date())})
            </span>
          )}
        </p>
      )
      break
    case 'currency':
      fieldComponent = (
        <p className={className}>
          {value
            ? (value as number).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              })
            : 0}
        </p>
      )
      break
    case 'text':
    case 'number':
    case 'email':
    default:
      fieldComponent = <p className={className}>{value as string}</p>
      break
  }

  return fieldComponent
}

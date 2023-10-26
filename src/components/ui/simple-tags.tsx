import React from 'react'
import { isValidURL } from '@/components/utils/data-parsing'
import clsx from 'clsx'

type SimpleTagsType = {
  className?: string
  list?: string[] | null
  keyPrefix?: string
}
export const SimpleTags: React.FC<SimpleTagsType> = ({ list, keyPrefix, className }) => {
  if (!list) return null

  return (
    <div className={clsx('flex max-w-full flex-wrap gap-1', className)}>
      {list?.map((item) => (
        <div
          key={`${keyPrefix}-${item}`}
          className="flex justify-between gap-2 rounded border p-1 px-2 text-sm"
        >
          {isValidURL(item) ? (
            <a
              target="_blank"
              href={item}
              rel="noreferrer"
              className={'max-w-[200px] truncate text-primary-50 underline'}
            >
              {item}
            </a>
          ) : (
            <p>{item}</p>
          )}
        </div>
      ))}
    </div>
  )
}

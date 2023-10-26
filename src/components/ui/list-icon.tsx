import React, { ReactNode, useId } from 'react'

type ListIconType = {
  icon: ReactNode
  list: string[] | { key: string; value: string | number | ReactNode }[] | null
}

export const ListIcon: React.FC<ListIconType> = ({ icon, list }) => {
  const generatedKey = useId()

  if (!list) return null

  return (
    <div className="flex flex-col">
      {list?.map((item) => (
        <div
          key={`${generatedKey}-${typeof item === 'string' ? item : item.key}`}
          className="flex items-center justify-between gap-2 px-2 text-sm"
        >
          <div className="flex items-center gap-2">
            {icon}
            {typeof item === 'string' ? <p>item</p> : item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

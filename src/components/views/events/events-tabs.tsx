import React, { FC } from 'react'
import { clsx } from 'clsx'

type EventTagsProps = {
  tabs: string[]
  currentTab: string
  setCurrentTab: any
}

const EventsTags: FC<EventTagsProps> = ({ tabs, setCurrentTab, currentTab }) => {
  const handleTab = (e: any) => {
    setCurrentTab(e)
  }
  return (
    <div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={clsx(
                tab === currentTab
                  ? 'bg-gray-100 text-gray-700'
                  : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-base font-medium capitalize'
              )}
              onClick={handleTab}
              id={tab}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default EventsTags

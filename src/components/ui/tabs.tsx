import clsx from 'clsx'
import React from 'react'

type TabsProps = {
  tabs: {
    id: string
    name: string
  }[]
  current: string
  onTabClick: (tab: string) => void
}
export const Tabs: React.FC<TabsProps> = ({ tabs = [], current, onTabClick }) => {
  if (tabs.length === 0) {
    return null
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={current}
          onChange={(e) => {
            onTabClick(e.target.value)
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={clsx(
                  tab.id === current
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                )}
                aria-current={tab.id === current ? 'page' : undefined}
                onClick={() => {
                  onTabClick(tab.id)
                }}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

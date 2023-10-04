import React, { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  tabs: {
    name: string
    icon: ReactNode
    component?: ReactNode
  }[]
}

const LayoutTabs: React.FC<Props> = ({ children, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0])
  return (
    <div className={`flex h-screen w-screen flex-col flex-wrap overflow-hidden`}>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`mx-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none ${
              activeTab.name === tab.name ? 'border-b-4 border-primary-500 text-gray-900' : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="flex items-center gap-1">
              {tab.icon} {tab.name}
            </span>
          </button>
        ))}
      </div>
      <hr className="my-2"></hr>
      {activeTab.component || children}
    </div>
  )
}

export default LayoutTabs

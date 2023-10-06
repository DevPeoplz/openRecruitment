import SideMenu from '@/components/layout/side-menu'
import React, { ReactNode } from 'react'
import NoSSR from '@/components/ui/nossr'

export const LayoutSideMenu: React.FC<{
  children: ReactNode
  menu?: string
  sidebar?: ReactNode
}> = ({ children, menu, sidebar }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full w-submenu overflow-y-auto overflow-x-hidden">
        {sidebar ? (
          sidebar
        ) : (
          <NoSSR>
            <SideMenu menu={menu} />
          </NoSSR>
        )}
      </div>
      <div className="flex h-full w-panel grow flex-col items-center justify-start gap-2 overflow-auto border p-4">
        {children}
      </div>
    </div>
  )
}

import SideMenu from '@/components/layout/side-menu'
import React, { ReactNode } from 'react'
import NoSSR from '@/components/ui/nossr'
import { NavLinks } from '@/components/ui/menu/mobile-nav-links'
import { BurgerMenu } from '@/components/ui/menu/burger-menu'
import { getChildrenNotDisplayName, getChildrenOnDisplayName } from '@/components/utils'

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>
}

type LayoutSideMenuPropsType = {
  children?: ReactNode
  menu?: string
}

type LayoutSideMenuSubComponents = {
  Sidebar: typeof Sidebar
}

export const LayoutSideMenu: LayoutSideMenuSubComponents & React.FC<LayoutSideMenuPropsType> = (
  props: LayoutSideMenuPropsType
) => {
  const { children, menu } = props
  const sidebar = getChildrenOnDisplayName(children, 'LayoutSideMenu.Sidebar')
  const body = getChildrenNotDisplayName(children, 'LayoutSideMenu.Sidebar')

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full w-submenu overflow-y-auto overflow-x-hidden">
        {sidebar && sidebar.length > 0 ? (
          sidebar
        ) : (
          <NoSSR>
            <SideMenu menu={menu} />
          </NoSSR>
        )}
      </div>
      <div className="flex h-full w-panel grow flex-col items-center justify-start gap-2 overflow-auto border p-4">
        {body}
      </div>
    </div>
  )
}

Sidebar.displayName = 'LayoutSideMenu.Sidebar'
LayoutSideMenu.Sidebar = Sidebar

import React, { ReactNode } from 'react'
import { AsideAuthenticated } from '@/components/layout/aside-authenticated'
import { HeaderAuthenticated } from '@/components/layout/header/header-authenticated'
import { MainAuthenticated } from '@/components/layout/main/main-authenticated'
import QuickActionsToolbar from '../quick-actions/quick-actions'

interface Props {
  children: ReactNode
}

const LayoutAuthenticated: React.FC<Props> = ({ children }) => {
  return (
    <div className={`flex h-screen w-screen flex-wrap overflow-hidden`}>
      <HeaderAuthenticated />
      <AsideAuthenticated />
      <MainAuthenticated>{children}</MainAuthenticated>
      <QuickActionsToolbar />
    </div>
  )
}

export default LayoutAuthenticated

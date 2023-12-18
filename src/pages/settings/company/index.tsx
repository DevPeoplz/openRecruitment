import React from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import TabsContainer from '@/components/layout/TabsContainer'
import GeneralSettings from '@/components/views/settings/company/general'
import CareerSiteSettings from '@/components/views/settings/company/career-site'

const TABS = [
  {
    name: 'General',
    component: <GeneralSettings />,
    icon: <div />,
  },
  {
    name: 'Career site',
    component: <CareerSiteSettings />,
    icon: <div />,
  },
]

const Page = () => {
  return (
    <LayoutSideMenu menu={'settings'}>
      <div className="flex w-full flex-col justify-start gap-2 p-4">
        <h2>Company Settings</h2>
        <p>Adjust company-wide settings here.</p>
        <TabsContainer tabs={TABS} />
      </div>
    </LayoutSideMenu>
  )
}

Page.auth = {
  permission: 'SUPERADMIN',
}
export default Page

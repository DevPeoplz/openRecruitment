import React from 'react'
import { SelectCompany } from '@/components/ui/select-company'
import Chip from '@/components/ui/Chip'
import { user } from '@/utils/mockdata'
import { MenuUser } from '@/components/layout/header/menu-user'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { CompanyLogo } from '@/components/ui/company-logo'

const navOptions: [string, string][] = [
  ['/dashboard', 'Dashboard'],
  ['/candidates', 'Candidates'],
  ['/jobs', 'Jobs'],
  ['/mailbox', 'Mailbox'],
  ['/reports', 'Reports'],
  ['/talent-pool', 'Talent pool'],
  ['/acquisition', 'Acquisition'],
  ['/settings', 'Settings'],
]

export function HeaderAuthenticated() {
  return (
    <header className="h-header w-full">
      <div className="z-10 flex h-14 items-center justify-between px-2">
        <div className="flex items-center gap-3 sm:gap-8">
          <CompanyLogo />
          <div className="flex gap-1 sm:gap-2">
            <SelectCompany />
            <Chip>{user.plan}</Chip>
          </div>
        </div>
        <div className="flex items-center md:gap-8">
          <IoMdNotificationsOutline className="h-8 w-8" />
          <MenuUser links={navOptions} />
        </div>
      </div>
    </header>
  )
}

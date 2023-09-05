import React from 'react'
import { SelectCompany } from '@/components/UI/select-company'
import { Logo } from '@/components/UI/Logo'
import Chip from '@/components/UI/Chip'
import { user } from '@/utils/mockdata'
import { MenuUser } from '@/components/layout/header/menu-user'
import { IoMdNotificationsOutline } from 'react-icons/io'

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
          <Logo />
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

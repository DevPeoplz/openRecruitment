import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  BarsArrowDownIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

import React, { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { getLocalStorageKey } from '@/components/utils'

type childrenNavigationItem = {
  name: string
  href: string
}

interface NavigationItem {
  name: string
  selectable?: boolean
  href?: string
  icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>
  children?: childrenNavigationItem[]
}

type Navigation = Record<string, NavigationItem[]>

const navigation: Navigation = {
  dashboard: [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Events', href: '/events', icon: ChartPieIcon },
    { name: 'Evaluations', href: '/', icon: DocumentDuplicateIcon },
    { name: 'Tasks', href: '/', icon: FolderIcon },
    { name: 'Activity', href: '/', icon: UsersIcon },
  ],
  settings: [
    {
      name: 'My account',
      href: '/settings/account',
      icon: UserIcon,
      children: [
        { name: 'Profile', href: '/settings/profile' },
        { name: 'Notifications', href: '/settings/notifications' },
      ],
    },
    {
      name: 'Company',
      selectable: false,
      href: '/settings/company',
      icon: HomeIcon,
      children: [
        { name: 'Company settings', href: '/settings/company' },
        { name: 'Team members', href: '/settings/company/team' },
        { name: 'Roles', href: '/settings/company/roles' },
        { name: 'Billing', href: '/settings/company/billing' },
        { name: 'ReferralsHub', href: '/settings/company/referral' },
        { name: 'Meeting rooms', href: '/settings/company/meeting-rooms' },
        { name: 'Audit logs', href: '/settings/company/audit-logs' },
      ],
    },
    {
      name: 'Workflow',
      icon: Squares2X2Icon,
      children: [
        { name: 'Requisition approvals', href: '/settings/workflow/approvals' },
        { name: 'Desqualify reasons', href: '/settings/workflow/disqualify-reasons' },
        { name: 'Tags & Sources', href: '/settings/workflow/tag-and-sources' },
        { name: 'Departments', href: '/settings/workflow/departments' },
        { name: 'Shared candidates', href: '/settings/workflow/shared-candidates' },
        { name: 'Event scheduling', href: '/settings/workflow/event-scheduling' },
      ],
    },
    {
      name: 'Templates',
      icon: BarsArrowDownIcon,
      children: [
        { name: 'Pipelines', href: '/settings/templates/pipelines' },
        { name: 'Profile fields', href: '/settings/templates/custom-fields' },
        { name: 'Email templates', href: '/settings/templates/email' },
        { name: 'Evaluation forms', href: '/settings/templates/evaluation' },
        { name: 'Questionnaires', href: '/settings/templates/questionnaires' },
        { name: 'Screening questions', href: '/settings/templates/screening-questions' },
      ],
    },
    {
      name: 'Apps and plugins',
      href: '/settings/plugins',
      icon: PuzzlePieceIcon,
    },
  ],
}

export default function SideMenu({ menu }: { menu?: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const path = menu ?? 'dashboard'
  const [sideMenuState, setSideMenuState] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return { none: false }

    const getSideMenuState = (name: string) => {
      const itemState = JSON.parse(
        window.localStorage.getItem(getLocalStorageKey(session?.user?.email, path, name)) || '{}'
      )

      return itemState['open'] || false
    }

    return Object.assign(
      {},
      ...navigation[path]
        .map((item) => {
          if (item.children) {
            return { [btoa(item.name)]: getSideMenuState(item.name) }
          }
          return null
        })
        .filter((i) => i)
    )
  })
  const itemsRef = useRef<Record<string, HTMLElement | null>>({})

  const setSideMenuLocalStorage = useCallback(
    (name: string) => {
      const itemState =
        itemsRef.current[btoa(name)]?.getAttribute('data-headlessui-state') === 'open'

      window.localStorage.setItem(
        getLocalStorageKey(session?.user?.email, path, name),
        JSON.stringify({ open: !itemState })
      )

      setSideMenuState((prevState) => ({ ...prevState, [btoa(name)]: !itemState }))
    },
    [path, session?.user?.email]
  )

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col">
          {navigation[path].map((item) => (
            <li key={item.name}>
              {!item.children && item.href ? (
                <Link
                  href={item.href}
                  className={clsx(
                    router.asPath === item.href
                      ? 'bg-gray-100 text-primary-500'
                      : 'hover:bg-gray-100',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700'
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={clsx(
                        router.asPath === item.href ? 'text-primary-500' : '',
                        'h-6 w-6 shrink-0 text-gray-400'
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {item.name}
                </Link>
              ) : (
                sideMenuState && (
                  <Disclosure
                    as="div"
                    ref={(el) => (itemsRef.current[btoa(item.name)] = el)}
                    defaultOpen={
                      (item.children &&
                        !!item.children.find((subItem) => router.asPath === subItem.href)) ||
                      sideMenuState[btoa(item.name)] ||
                      false
                    }
                    onClick={() => {
                      setSideMenuLocalStorage(item.name)
                    }}
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={
                            'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50'
                          }
                        >
                          {item.icon && (
                            <item.icon
                              className={clsx(
                                router.asPath === item.href ? 'text-primary-500' : '',
                                'h-6 w-6 shrink-0 text-gray-400'
                              )}
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                          <ChevronRightIcon
                            className={clsx(
                              open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                              'ml-auto h-5 w-5 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel as="ul" className="mt-1 px-2">
                          {item.children &&
                            item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className={clsx(
                                    router.asPath === subItem.href
                                      ? 'bg-gray-100 text-primary-500'
                                      : 'hover:bg-gray-100',
                                    'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700'
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

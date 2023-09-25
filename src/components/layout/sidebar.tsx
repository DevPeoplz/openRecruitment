import React from 'react'
import Link from 'next/link'
import { GoBriefcase, GoGraph, GoHome, GoInbox, GoPeople, GoPersonAdd, GoRss } from 'react-icons/go'
import { IoMdSettings } from 'react-icons/io'
import { Tooltip } from 'react-tooltip'
import clsx from 'clsx'
import { useRouter } from 'next/router'

const roots = [
  {
    name: 'dashboard',
    href: '/dashboard',
    icon: GoHome,
  },
  {
    name: 'candidates',
    href: '/candidates',
    icon: GoPeople,
  },
  {
    name: 'jobs',
    href: '/jobs',
    icon: GoBriefcase,
  },
  {
    name: 'mailbox',
    href: '/mailbox',
    icon: GoInbox,
  },
  {
    name: 'reports',
    href: '/reports',
    icon: GoGraph,
  },
  {
    name: 'talent pools',
    href: '/talent_pool',
    icon: GoPersonAdd,
  },
  {
    name: 'acquisition',
    href: '/acquisition',
    icon: GoRss,
  },
]

const Sidebar: React.FC = () => {
  const router = useRouter()
  return (
    <nav className="flex h-full flex-col items-center justify-between pb-2 pt-3">
      <ul className="flex flex-col gap-4">
        {roots.map((item) => (
          <li key={item.name}>
            <Link href={item.href} data-tooltip-id="my-tooltip" data-tooltip-content={item.name}>
              <item.icon
                className={clsx(
                  router.asPath.split('?')[0] === item.href
                    ? 'text-primary-500 drop-shadow-lg'
                    : '',
                  'h-8 w-8 text-gray-500 hover:text-black'
                )}
              ></item.icon>
            </Link>
            <Tooltip place="right" content={item.name} id="my-tooltip" className="z-50 capitalize">
              <span className="text-xs ">{item.name}</span>
            </Tooltip>
          </li>
        ))}
      </ul>
      <Link href="/settings" data-tooltip-id="my-tooltip" data-tooltip-content="settings">
        <IoMdSettings
          className={clsx(
            router.asPath.split('?')[0] === '/settings' ? 'text-primary-500 drop-shadow-lg' : '',
            'h-8 w-8 text-gray-500 hover:text-black'
          )}
        />
        <Tooltip place="right" content="settings" id="my-tooltip" className="z-50 capitalize">
          <span className="text-xs ">settings</span>
        </Tooltip>
      </Link>
    </nav>
  )
}

export default Sidebar

import React, { isValidElement, ReactElement, ReactNode } from 'react'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { MobileNavLinks, NavLinks } from './mobile-nav-links'
import { getChildrenOnDisplayName } from '@/components/utils'

function Icon({
  children,
  open,
}: {
  children: ReactNode | ((open: boolean) => ReactNode)
  open?: boolean
}) {
  let icon = children
  if (typeof children === 'function' && open !== undefined) {
    icon = children(open)
  }

  return <>{icon}</>
}

function Buttons({ children }: { children: ReactNode }) {
  return <>{children}</>
}

Icon.displayName = 'BurgerMenu.Icon'
Buttons.displayName = 'BurgerMenu.Buttons'
BurgerMenu.Icon = Icon
BurgerMenu.Buttons = Buttons

type BurgerMenuPropsType = NavLinks & {
  children?: ReactNode
  overlay?: boolean
  enableOnDesktop?: boolean
}

type BurgerMenuSubComponents = {
  Icon?: typeof Icon
  Buttons?: typeof Buttons
}

export function BurgerMenu(props: BurgerMenuPropsType & BurgerMenuSubComponents) {
  const { children, links, overlay, enableOnDesktop } = props

  const filteredIcons = getChildrenOnDisplayName(children, 'BurgerMenu.Icon')
  const filteredButtons = getChildrenOnDisplayName(children, 'BurgerMenu.Buttons')

  return (
    <Popover className={`${enableOnDesktop ? '' : 'sm:hidden'}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className="relative z-10 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 "
            aria-label="Toggle site navigation"
          >
            {filteredIcons?.map((icon) => {
              if (isValidElement(icon))
                return React.cloneElement(icon as ReactElement<{ open: boolean }>, { open })
              return icon
            })}
          </Popover.Button>

          <AnimatePresence initial={false}>
            {open && (
              <>
                {overlay && (
                  <Popover.Overlay
                    static
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                  />
                )}
                <Popover.Panel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, y: -32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -32,
                    transition: { duration: 0.5 },
                  }}
                  className="absolute inset-x-0 top-0 z-10 rounded-b-2xl border  bg-gray-50 px-6 pb-6 pt-16 shadow-2xl shadow-gray-900/20 backdrop-blur sm:top-16 sm:origin-top-left sm:pt-4 md:inset-x-auto md:right-2 md:mx-auto md:w-72 md:origin-top-right md:rounded-2xl md:shadow-2xl md:shadow-gray-900/20 md:backdrop-blur "
                >
                  <MobileNavLinks links={links} />
                  <div className="mt-4 flex flex-col gap-4">{filteredButtons}</div>
                </Popover.Panel>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  )
}

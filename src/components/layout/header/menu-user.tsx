import React from 'react'
import Avatar from '../../UI/Avatar'
import { Button } from '../../UI/Button'
import { signOut, useSession } from 'next-auth/react'
import { BurgerMenu } from '@/components/UI/menu/burger-menu'
import { NavLinks } from '@/components/UI/menu/mobile-nav-links'
import { HiChevronUp } from 'react-icons/hi'

export function MenuUser({ links }: NavLinks) {
  const { data: session } = useSession()

  return (
    <BurgerMenu links={links} enableOnDesktop={true}>
      <BurgerMenu.Icon>
        {(open) => (
          <>
            <HiChevronUp className={`${open ? '' : 'hidden'} m-2 h-6 w-6 sm:hidden`} />
            <Avatar
              className={open ? 'hidden sm:flex' : ''}
              src={session?.user?.image}
              name={session?.user?.name}
            />
          </>
        )}
      </BurgerMenu.Icon>
      <BurgerMenu.Buttons>
        <Button
          href="#"
          variant="solid"
          size="full"
          onClick={() => {
            signOut({ redirect: true }).then(() => close())
          }}
        >
          Logout
        </Button>
      </BurgerMenu.Buttons>
    </BurgerMenu>
  )
}

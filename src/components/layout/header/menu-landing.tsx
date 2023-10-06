import React from 'react'
import { Button } from '@/components/ui/Button'
import { BurgerMenu } from '@/components/ui/menu/burger-menu'
import { NavLinks } from '@/components/ui/menu/mobile-nav-links'
import { HiChevronUp, HiMenu } from 'react-icons/hi'

export function MenuLanding({
  links,
  isLogin,
  isSignUp,
}: NavLinks & { isLogin: boolean; isSignUp: boolean }) {
  return (
    <BurgerMenu links={links} overlay={true}>
      <BurgerMenu.Icon>
        {(open) => (open ? <HiChevronUp className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />)}
      </BurgerMenu.Icon>
      <BurgerMenu.Buttons>
        {!isLogin && (
          <Button href="/login" variant="outline" size="full" onClick={() => close()}>
            Log in
          </Button>
        )}
        {!isSignUp && (
          <Button href="/signup" size="full" onClick={() => close()}>
            Sign Up
          </Button>
        )}
      </BurgerMenu.Buttons>
    </BurgerMenu>
  )
}

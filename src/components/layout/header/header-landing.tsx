import React from 'react'
import { Logo } from '@/components/ui/Logo'
import { NavLinks } from '@/components/ui/NavLinks'
import { Container } from '@/components/ui/Container'
import { NextRouter, useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import { MenuLanding } from './menu-landing'

const navOptions: [string, string][] = [
  ['#features', 'Features'],
  ['#reviews', 'Reviews'],
  ['#pricing', 'Pricing'],
  ['#faqs', 'FAQs'],
]

export function HeaderLanding() {
  const router: NextRouter = useRouter()
  const currentPath = router.pathname
  const isLogin = currentPath === '/login'
  const isSignUp = currentPath === '/signup'

  return (
    <header className="w-full">
      <Container>
        <div className="flex justify-between py-4">
          <div className="relative  flex items-center gap-16">
            <Logo />
            <div className="hidden sm:flex lg:gap-10">
              <NavLinks links={navOptions} />
            </div>
          </div>
          <div className="flex items-center md:gap-4">
            <MenuLanding links={navOptions} isLogin={isLogin} isSignUp={isSignUp} />
            {!isLogin && (
              <Button href="/login" variant="outline" size="medium" className="hidden sm:block">
                Log in
              </Button>
            )}
            {!isSignUp && (
              <Button href="/signup" className="hidden sm:block" size="medium">
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

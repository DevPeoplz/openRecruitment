import React from 'react'
import { Container } from '@/components/ui/Container'
import { NavLinks } from '@/components/ui/NavLinks'
import { Logo } from '@/components/ui/Logo'
import JoinNewsletter from '../JoinNewsletter'
import { useSession } from 'next-auth/react'

const FooterLanding = () => {
  const { data: session } = useSession()
  const navOptions: [string, string][] = [
    ['/#features', 'Features'],
    ['/#reviews', 'Reviews'],
    ['/#pricing', 'Pricing'],
    ['/#faqs', 'FAQs'],
  ]

  return (
    <>
      {!session && (
        <footer className="w-full border-t border-gray-200">
          <Container>
            <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
              <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="flex w-full items-center justify-between text-gray-900 lg:w-fit">
                  <Logo />
                  <div className="ml-4">
                    <p className="text-base font-semibold">Open Recruitment</p>
                    <p className="mt-1 text-sm">Hire the best people for your team</p>
                  </div>
                </div>
                <nav className="hidden md:block">
                  <NavLinks links={navOptions} />
                </nav>
              </div>
            </div>
            <div className="flex w-full flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
              <JoinNewsletter />
              <p className="mt-6 text-sm text-gray-500 md:mt-0">
                &copy; Copyright {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </Container>
        </footer>
      )}
    </>
  )
}

export default FooterLanding

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLinks } from './menu/mobile-nav-links'

export function NavLinks({ links }: NavLinks) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className="flex gap-8" onMouseLeave={() => setHoveredIndex(null)}>
      {links.map(([href, text], index) => (
        <Link key={text} href={href} passHref>
          <p
            className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded-lg bg-gray-100"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{text}</span>
          </p>
        </Link>
      ))}
    </nav>
  )
}

import React from 'react'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" aria-label="Home" className={'w-10'}>
      <div className="flex h-7 w-full items-center justify-center rounded border-2 border-primary-500">
        <p className="text-primary-500">Logo</p>
      </div>
    </Link>
  )
}

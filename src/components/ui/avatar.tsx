import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  src?: string | null
  name?: string | null
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const sizeClass = {
  small: 'h-8 w-8',
  medium: 'h-12 w-12',
  large: 'h-16 w-16',
}

const Avatar: React.FC<Props> = ({ src, name, className, size = 'medium' }) => {
  const altName = name || 'avatar'
  return src ? (
    <Image
      src={src}
      alt={altName}
      width={40}
      height={40}
      className={clsx(className, 'rounded-full border border-black object-cover', sizeClass[size])}
    />
  ) : (
    <div
      className={`${className} m-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-primary-500 text-white`}
    >
      <p>{altName?.charAt(0)}</p>
    </div>
  )
}

export default Avatar

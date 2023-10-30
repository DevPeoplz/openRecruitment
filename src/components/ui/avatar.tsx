import React from 'react'
import Image from 'next/image'

interface Props {
  src?: string | null
  name?: string | null
  className?: string
}

const Avatar: React.FC<Props> = ({ src, name, className }) => {
  const altName = name || 'avatar'
  return src ? (
    <Image
      src={src}
      alt={altName}
      width={40}
      height={40}
      className={`${className} h-16 w-16 rounded-full border border-black object-cover`}
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

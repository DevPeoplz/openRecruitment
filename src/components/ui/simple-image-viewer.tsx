import React from 'react'
import Image from 'next/image'
import ModalContainer from '@/components/modals/modal-container'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface Props {
  src?: string | null
  name?: string | null
  className?: string
  children: React.ReactNode
}

const ImageViewer: React.FC<Props> = ({ src, name, className, children }) => {
  const altName = name || 'image'
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOnClick = () => {
    setIsOpen(true)
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  if (!src) return <>{children}</>

  return (
    <>
      <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} className={'relative h-4/5 w-auto'}>
        <div
          onClick={handleCloseDialog}
          className={`absolute right-1 top-1 z-40 m-0.5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary-400 text-white opacity-40 hover:opacity-100`}
        >
          <XMarkIcon className="h-7 w-7 font-bold" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center">
          <Image
            src={src}
            alt={altName}
            width={1280}
            height={720}
            className="h-full w-full object-contain"
          />
        </div>
      </ModalContainer>

      <div className="cursor-pointer" onClick={handleOnClick}>
        {children}
      </div>
    </>
  )
}

export default ImageViewer

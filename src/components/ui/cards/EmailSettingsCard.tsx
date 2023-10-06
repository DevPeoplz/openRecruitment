import React from 'react'
import Image from 'next/image'
import { Button } from '../Button'
import { GoCheck } from 'react-icons/go'

type emailProvider = {
  name: string
  icon: string
  email?: string
  isConnected: boolean
}

const EmailSettingsCard: React.FC<emailProvider> = ({ name, icon, email, isConnected }) => {
  return (
    <div className="my-4 flex gap-4 rounded-md border border-l-4 border-l-primary-500 p-2 ">
      <Image
        src={icon}
        alt={name}
        width={50}
        height={50}
        className="rounded-md  border object-contain "
      />
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-bold md:text-xl">{name}</h3>
        <p className="text-xs text-gray-500 md:text-sm">{email ? email : '---'}</p>
      </div>
      <div className="ml-auto flex w-40  items-center">
        {isConnected ? (
          <span className="flex items-center">
            <GoCheck className="text-gray-500" />
            <p className="font-bold text-gray-500">Connected</p>
          </span>
        ) : (
          <Button variant="outline" color="primary">
            Connect
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmailSettingsCard

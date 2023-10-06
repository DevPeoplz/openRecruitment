import React from 'react'
import EmailSettingsCard from '@/components/ui/cards/EmailSettingsCard'
import { user } from '../../utils/mockdata'
import { Button } from '@/components/ui/Button'
import { GoPencil } from 'react-icons/go'

const emailProviders = [
  {
    name: 'Open Recruitment',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png',
    email: 'email@email.com',
    isConnected: true,
  },
  {
    name: 'Gmail',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png',
    isConnected: false,
  },
]

const EmailSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Email Provider</h2>
      <p className="text-base text-gray-500">
        Choose which email address you want to use when sending emails:
      </p>
      {emailProviders.map((provider, index) => (
        <EmailSettingsCard
          key={index}
          name={provider.name}
          icon={provider.icon}
          email={provider.email}
          isConnected={provider.isConnected}
        />
      ))}
      <span className="flex justify-between">
        <h2 className="text-2xl font-bold">Email Signature</h2>
        <Button variant="noborder" color="primary" icon={<GoPencil />}>
          Edit
        </Button>
      </span>
      <p className="mb-2 text-base text-gray-500">
        Choose which email address you want to use when sending emails:
      </p>
      <div className="border p-2">
        <p>{user.signature}</p>
      </div>
    </div>
  )
}

export default EmailSettings

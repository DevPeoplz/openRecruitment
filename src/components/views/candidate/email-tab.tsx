import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'

const MESSAGES = [
  {
    id: 1,
    send_by: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    date: '2021-08-01',
  },
  {
    id: 2,
    send_by: 'candidate',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    date: '2021-08-01',
  },
  {
    id: 3,
    send_by: 'user',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    date: '2021-08-01',
  },
  {
    id: 4,
    send_by: 'candidate',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  ',
    date: '2021-08-01',
  },
]

const EmailTab: FC = () => {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex justify-end">
        <button className="rounded-md bg-primary-500 p-2 text-white">
          <span className="flex items-center gap-2">
            <PaperAirplaneIcon className="h-5 w-5" />
            <p>New mail</p>
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto ">
        {MESSAGES.map((message) => (
          <div key={message.id} className="flex gap-2 ">
            <div className="flex w-100 flex-col gap-1 whitespace-normal">
              <div className="flex items-center justify-between">
                <p className="font-bold">User</p>
                <p className="text-gray-500">4 days ago</p>
              </div>
              <p className="whitespace-normal">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmailTab

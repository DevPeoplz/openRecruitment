import React from 'react'
import { user } from '@/utils/mockdata'
import Avatar from '../avatar'
import { useSession } from 'next-auth/react'

const UserCard = () => {
  const { data: session } = useSession()

  return (
    <div className="my-2 flex gap-2 rounded-xl border p-2">
      <Avatar src={user.avatar} name={session?.user?.name} />
      <div>
        <h2 className="text-xl font-bold">{session?.user?.name}</h2>
        <p className="text-gray-500">{session?.user?.email}</p>
      </div>
    </div>
  )
}

export default UserCard

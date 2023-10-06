import React from 'react'
import { user } from '@/utils/mockdata'
import Avatar from '../Avatar'

const UserCard = () => {
  return (
    <div className="my-2 flex gap-2 rounded-xl border p-2">
      <Avatar src={user.avatar} name={user.name} />
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  )
}

export default UserCard

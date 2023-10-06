import React from 'react'
import { Button } from '@/components/ui/Button'
import { GoTrash, GoPencil } from 'react-icons/go'
import UpdatePasswordModal from '../modals/UpdatePasswordModal'

const Security = () => {
  const [openUpdatePassword, setOpenUpdatePassword] = React.useState(false)
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span>
          <h2 className="text-xl font-bold">Delete account</h2>
          <p className="text-gray-500">
            Once you delete your account, there is no going back. Please be carefull.
          </p>
        </span>
        <div className="md:self-end">
          <Button size="large" variant="noborder" icon={<GoTrash />}>
            Delete Account
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Update Password</h2>

        <div className="md:self-end">
          <Button
            size="large"
            variant="noborder"
            icon={<GoPencil />}
            onClick={() => setOpenUpdatePassword(true)}
          >
            Update
          </Button>
          <UpdatePasswordModal isOpen={openUpdatePassword} setIsOpen={setOpenUpdatePassword} />
        </div>
      </div>
    </div>
  )
}

export default Security

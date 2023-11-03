import React from 'react'
import ModalContainer from './modal-container'
import UserCard from '@/components/ui/cards/UserCard'
import { PasswordField } from '@/components/ui/fields'
import { Button } from '@/components/ui/Button'
import Alert from '@/components/alert'
import { UPDATE_USER_PASSWORD_MUTATION } from '@/graphql-operations/mutations'
import Loader from '@/components/ui/loader'
import { useMutation } from '@apollo/client'

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePasswordModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = React.useState<{
    password?: string
    new_password?: string
    confirm_password?: string
  }>({})
  const [isVerified, setIsVerified] = React.useState(false)

  const [updateUserPassword, { data, loading, error }] = useMutation(UPDATE_USER_PASSWORD_MUTATION)

  const checkNewPassword = () => {
    return !!(
      password.new_password &&
      password.new_password === password.confirm_password &&
      password.password !== password.new_password
    )
  }

  const cancel = () => {
    setPassword({})
    setIsVerified(false)
    setIsOpen(false)
  }

  const handlePasswordUpdate = () => {
    if (password.password && checkNewPassword()) {
      updateUserPassword({
        variables: {
          data: {
            password: password.password,
            newPassword: password.new_password,
            confirmPassword: password.confirm_password,
          },
        },
      })
        .then(() => {
          Alert({ message: 'Password updated', type: 'success' }).then()
          cancel()
        })
        .catch((err) => {
          Alert({ message: err.message, type: 'error' }).then()
        })
    } else {
      Alert({ message: 'Password Confirmation Failed!', type: 'error' }).then()
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Update Password">
      <UserCard />
      <div>
        <div className="mt-4 flex flex-col gap-4">
          <p className="mb-2 text-base text-gray-500 duration-300 ease-in">
            Verify that it&apos;s you in order to continue
          </p>
          <PasswordField
            label="Current Password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            value={password.password}
            onChange={handlePasswordChange}
          />
          <p className="mb-2 text-base text-gray-500 duration-300 ease-in">
            Choose a new password:
          </p>
          <PasswordField
            label="New Password"
            id="new_password"
            name="new_password"
            autoComplete="new-password"
            required
            onChange={handlePasswordChange}
          />
          <PasswordField
            label="Confirm Password"
            id="confirm_password"
            name="confirm_password"
            required
            onChange={handlePasswordChange}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="noborder" color="primary" size="small" onClick={() => cancel()}>
            Cancel
          </Button>
          <Button variant="solid" color="gray" size="small" onClick={handlePasswordUpdate}>
            {loading ? <Loader size="h-4 w-4" fullScreen={false} /> : 'Continue'}
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default UpdatePasswordModal

import React from 'react'
import ModalContainer from './modal-container'
import UserCard from '../UI/cards/UserCard'
import { TextField } from '../UI/fields'
import { Button } from '../UI/Button'
import Alert from '@/components/alert'

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePasswordModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  const [password, setPassword] = React.useState('')
  const [isVerified, setIsVerified] = React.useState(false)

  const checkPassword = (password: string) => {
    //this is temporal
    if (password === '123') {
      setIsVerified(true)
    } else {
      Alert({ message: 'Wrong password', type: 'error' })
      setPassword('')
    }
  }

  const cancel = () => {
    setPassword('')
    setIsVerified(false)
    setIsOpen(false)
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isVerified ? 'Update Password' : 'Verify your identity'}
    >
      <UserCard />
      {isVerified ? (
        <div>
          <div className="mt-4 flex flex-col gap-4">
            <p>Choose a new password</p>
            <TextField
              label="New Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <TextField
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="noborder" color="primary" size="small" onClick={() => cancel()}>
              Cancel
            </Button>
            <Button variant="solid" color="gray" size="small">
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-base text-gray-500 duration-300 ease-in">
            Verify that it&apos;s you in order to continue
          </p>
          <TextField
            label="Current Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="noborder"
              color="primary"
              size="small"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="gray"
              size="small"
              onClick={() => checkPassword(password)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </ModalContainer>
  )
}

export default UpdatePasswordModal

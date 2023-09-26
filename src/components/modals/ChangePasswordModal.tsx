import React from 'react'
import ModalContainner from './modal-container'
import { TextField } from '../UI/fields'
import { Button } from '../UI/Button'

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePasswordModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainner isOpen={isOpen} setIsOpen={setIsOpen} title="Change Password">
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
        <Button variant="noborder" color="primary" size="small" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="solid" color="gray" size="small">
          Continue
        </Button>
      </div>
    </ModalContainner>
  )
}

export default ChangePasswordModal

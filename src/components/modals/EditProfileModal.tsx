import React from 'react'
import ModalContainner from './modal-container'
import { PhoneField, SelectField, TextField, TimezoneSelect, UploadFile } from '../UI/fields'
import { languages, days } from '@/utils/mockdata'
import { Button } from '../UI/Button'
import { GoTrash } from 'react-icons/go'
import { Tooltip } from 'react-tooltip'

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainner isOpen={isOpen} setIsOpen={setIsOpen} title="Edit profile">
      <div className="my-4 flex flex-col gap-4">
        <TextField id="name" label="First Name" />
        <TextField id="last_name" label="Last Name" />
        <TextField id="email" label="Email" />
        <PhoneField id="tel" label="Phone Number" />
        <UploadFile id="avatar" label="Profile picture" />
        <div className="flex justify-between gap-1 ">
          <SelectField id="language" label="Language" options={languages} className="w-1/2" />
          <TimezoneSelect id="time_zone" className="w-1/2" />
        </div>
        <div className="flex justify-between gap-1">
          <SelectField id="language" label="Time format" options={languages} className="w-1/2" />
          <SelectField id="language" label="Week begining" options={days} className="w-1/2" />
        </div>
        <Button
          variant="noborder"
          size="large"
          color="gray"
          icon={<GoTrash />}
          data-tooltip-id="delete_warning"
        >
          Delete Account
        </Button>
        <Tooltip
          place="bottom"
          content="This action is irreversible"
          id="delete_warning"
          className="capitalize"
          variant="warning"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="noborder" color="primary" size="small" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="solid" color="primary" size="small">
          Save
        </Button>
      </div>
    </ModalContainner>
  )
}

export default EditProfileModal

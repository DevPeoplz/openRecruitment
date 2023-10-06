import React from 'react'
import { user } from '@/utils/mockdata'
import Avatar from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import TabsContainer from '@/components/layout/TabsContainer'
import EmailSettings from '@/components/user/EmailSettings'
import Companies from '@/components/user/Companies'
import Calendars from '@/components/user/Calendars'
import Security from '@/components/user/Security'
import Appearance from '@/components/user/Appearance'
import EditProfileModal from '@/components/modals/EditProfileModal'
import UpdatePasswordModal from '@/components/modals/UpdatePasswordModal'
import { GoCalendar, GoGear, GoKey, GoLock, GoMail, GoOrganization } from 'react-icons/go'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'

const tabs = [
  {
    name: 'email settings',
    component: <EmailSettings />,
    icon: <GoMail />,
  },
  {
    name: 'companies',
    component: <Companies />,
    icon: <GoOrganization />,
  },
  {
    name: 'calendars',
    component: <Calendars />,
    icon: <GoCalendar />,
  },
  {
    name: 'security',
    component: <Security />,
    icon: <GoLock />,
  },
  {
    name: 'appearance',
    component: <Appearance />,
    icon: <GoGear />,
  },
]

const Profile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = React.useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = React.useState(false)
  return (
    <LayoutSideMenu menu={'settings'}>
      <div className="flex w-full flex-col items-center justify-between  gap-2  md:gap-8 lg:flex-row  ">
        <div className="flex items-end gap-4">
          <Avatar src={user.avatar} name={user.name} />
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.tel}</p>
          </div>
          <div>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<GoGear />}
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            Edit profile
          </Button>
          <Button
            variant="outline"
            size="large"
            icon={<GoKey />}
            onClick={() => setIsChangePasswordModalOpen(true)}
          >
            Change Password
          </Button>
          <EditProfileModal isOpen={isEditProfileModalOpen} setIsOpen={setIsEditProfileModalOpen} />
          <UpdatePasswordModal
            isOpen={isChangePasswordModalOpen}
            setIsOpen={setIsChangePasswordModalOpen}
          />
        </div>
      </div>
      <TabsContainer tabs={tabs} />
    </LayoutSideMenu>
  )
}

Profile.auth = {}

export default Profile

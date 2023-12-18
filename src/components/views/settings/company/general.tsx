import React, { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/ui/avatar'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'
import Loader from '@/components/ui/loader'
import Alert from '@/components/alert'
import { uploadFileHelper } from '@/components/file-upload/file-upload'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_ME_COMPANIES } from '@/graphql-operations/queries'
import { PencilIcon } from '@heroicons/react/24/outline'
import EditCompanyModal from '@/components/modals/edit-company-modal'

const GeneralSettings = () => {
  const { data: session } = useSession()
  const client = useApolloClient()
  const [logo, setLogo] = React.useState<File | undefined>(undefined)
  const [updating, setUpdating] = React.useState(false)
  const { data: query } = useQuery(GET_ME_COMPANIES)
  const [openEditCompanyModal, setOpenEditCompanyModal] = React.useState(false)

  const COMPANY = query?.me?.hiringRoles[session?.user.selectedCompany - 1].company.name

  console.log(session)

  const handleFileUpload = useCallback(
    async (file: File | undefined, field: string) => {
      if (!file) {
        return Alert({ type: 'error', message: 'Please select a file' })
      } else if (file.size > 2048000) {
        return Alert({ type: 'error', message: 'File size cannot exceed more than 2MB' })
      } else {
        if (session?.user?.selectedCompany) {
          setUpdating(true)
          try {
            try {
              await uploadFileHelper(
                file,
                field,
                String(session?.user?.selectedCompany),
                'company'
              ).then(() => {
                setLogo(undefined)
                client
                  .refetchQueries({
                    include: ['GET_ME_DATA_AND_COMPANIES', 'GET_ME_COMPANIES'],
                  })
                  .then(() => {
                    Alert({ type: 'success', message: 'File updated successfully' }).then()
                  })
              })
            } catch (err) {
              console.log(err)
              Alert({
                type: 'warning',
                message: 'File could not be uploaded!',
              }).then()
            }
          } finally {
            setUpdating(false)
          }
        } else {
          Alert({
            type: 'warning',
            message: 'Please select a company',
          }).then()
        }
      }

      return Promise.resolve()
    },
    [client, session?.user?.selectedCompany]
  )

  const handleClick = () => {
    handleFileUpload(logo, 'logo').then()
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-lg">Update logo</h3>
        <div className="flex justify-between">
          <p>Add or update a logo to your company.</p>
          <div className="flex gap-2">
            {session?.user.image ? (
              <Avatar src={session.user.image} name={session.user.name} />
            ) : null}
            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="logo"
                  className={clsx(
                    'block max-w-[250px] cursor-pointer truncate rounded border border-gray-200 p-2 font-bold',
                    logo ? 'bg-success' : ''
                  )}
                >
                  {logo?.name || 'Select a Logo'}
                </label>
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setLogo(e.target.files ? e.target.files[0] : undefined)
                  }}
                />
              </div>
              <Button onClick={handleClick} variant="solid">
                {updating ? (
                  <Loader fullScreen={false} size={'h-5 w-5'} />
                ) : (
                  <span>Upload Logo</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg">Company details</h3>
        <div className="flex items-center justify-between">
          <p>{COMPANY}</p>
          <Button
            variant="outline"
            size="small"
            icon={<PencilIcon className="h-4" />}
            onClick={() => setOpenEditCompanyModal(true)}
          >
            Edit
          </Button>
          <EditCompanyModal isOpen={openEditCompanyModal} setIsOpen={setOpenEditCompanyModal} />
        </div>
      </div>
      <div>
        <h3 className="text-lg">Company inbox</h3>
        <div className="flex items-center justify-between">
          <p>{session?.user.email}</p>
          <Button variant="outline" size="small" icon={<PencilIcon className="h-4" />}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings

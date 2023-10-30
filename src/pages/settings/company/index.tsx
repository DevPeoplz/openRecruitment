import React, { useCallback } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import Alert from '@/components/alert'
import { uploadFileHelper } from '@/components/file-upload/file-upload'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'
import { useApolloClient } from '@apollo/client'
import Loader from '@/components/ui/loader'

const Page = () => {
  const { data: session } = useSession()
  const client = useApolloClient()
  const [updating, setUpdating] = React.useState(false)
  const [logo, setLogo] = React.useState<File | undefined>(undefined)

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
    [session?.user?.selectedCompany]
  )

  const handleClick = () => {
    handleFileUpload(logo, 'logo').then()
  }

  return (
    <LayoutSideMenu menu={'settings'}>
      <div className="flex w-full flex-col justify-start gap-2 p-4">
        <h2 className="mb-5 text-2xl font-bold">Update Logo</h2>
        <div className="flex flex-wrap gap-2">
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
            {updating ? <Loader fullScreen={false} size={'h-4 w-4'} /> : <span>Upload Logo</span>}
          </Button>
        </div>
      </div>
    </LayoutSideMenu>
  )
}

Page.auth = {
  permission: 'SUPERADMIN',
}
export default Page

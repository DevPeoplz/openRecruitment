import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/fields'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMPANY_BY_ID, GET_ME_COMPANIES } from '@/graphql-operations/queries'
import { useSession } from 'next-auth/react'

const EditCompany = () => {
  const { data: session } = useSession()
  const { data: companies } = useQuery(GET_ME_COMPANIES)
  const companyID = companies?.me?.hiringRoles[session?.user.selectedCompany].company.id

  const { data, loading } = useQuery(GET_COMPANY_BY_ID, {
    variables: {
      where: {
        id: '1',
      },
    },
  })

  console.log(loading, session, companies, companyID)

  return (
    <form className="flex flex-col gap-2">
      <TextField id="name" label="Company name" placeholder={data?.findUniqueCompany?.name} />
      <TextField id="phone" label="Phone" placeholder={data?.findUnique?.company.phone} />
      <TextField id="address" label="Address" placeholder={data?.findUnique?.company.address} />
      <div className="grid grid-cols-3 gap-2">
        <TextField id="country" label="Country" placeholder={data?.findUnique?.company.country} />
        <TextField id="state" label="State" placeholder={data?.findUnique?.company.state} />
        <TextField id="city" label="City" placeholder={data?.findUnique?.company.city} />
      </div>
      <Button type="submit" className="mt-8 w-full">
        Update company
      </Button>
    </form>
  )
}

export default EditCompany

import React from 'react'
import Avatar from '../avatar'
import Chip from '../Chip'
import { GoPeople, GoCheck, GoKebabHorizontal } from 'react-icons/go'
import { Button } from '../Button'
import { Tooltip } from 'react-tooltip'

type props = {
  company: company
}

type company = {
  id: number
  name: string
  role: string
  members: number
  signed: boolean
}

const CompanyCard: React.FC<props> = ({ company }) => {
  return (
    <div className="mt-4 flex justify-between rounded-md border border-l-4 border-l-primary-500 py-2">
      <div className="flex gap-4 ">
        <Avatar name={company.name} />
        <div className="flex flex-col">
          <span className="flex gap-4">
            <h2 className="text-xs md:text-lg">{company.name}</h2>
            <Chip>ID: {company.id}</Chip>
          </span>
          <div className="flex items-center gap-2 text-gray-500">
            <p>{company.role}</p>
            <span className="flex items-center gap-1">
              <GoPeople data-tooltip-id="members-tooltip" />
              <Tooltip
                place="bottom"
                content="Team members"
                id="members-tooltip"
                className="capitalize"
              />
              <p>{company.members}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="mr-4 flex items-center">
        {company.signed ? (
          <div className="flex items-center gap-2">
            <GoCheck className="text-primary-500" />
            <p className="text-primary-500">Signed in</p>
            <GoKebabHorizontal
              data-tooltip-id="more-tooltip"
              className="h-6 w-6 cursor-pointer rounded-lg text-base hover:bg-gray-200 "
            />
            <Tooltip place="bottom" content="More" id="more-tooltip" className="capitalize" />
          </div>
        ) : (
          <Button variant="solid" color="primary" size="small">
            Sign in
          </Button>
        )}
      </div>
    </div>
  )
}

export default CompanyCard

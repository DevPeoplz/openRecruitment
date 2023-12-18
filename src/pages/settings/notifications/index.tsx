import React from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { Button } from '@/components/ui/Button'
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'

const Notifications = () => {
  return (
    <LayoutSideMenu menu={'settings'}>
      <div className="flex w-full flex-col gap-2 p-2">
        <h2>Notifications</h2>
        <div className="flex items-center justify-between">
          <p>Select witch notifications you want to receive and where to receive them</p>
          <Button variant="outline" size="large" icon={<ArrowUturnLeftIcon />}>
            Reset to default
          </Button>
        </div>
        <hr />
      </div>
    </LayoutSideMenu>
  )
}

Notifications.auth = {}

export default Notifications

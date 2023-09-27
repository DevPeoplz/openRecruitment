import React from 'react'
import type { NextPageWithLayout } from '../_app'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { useRedirectionFlag } from '@/hooks/redirection'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import Loader from '@/components/UI/loader'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const CalendarView: NextPageWithLayout = () => {
  useRedirectionFlag()

  const localizer = momentLocalizer(moment)

  return (
    <LayoutSideMenu>
      <div>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </LayoutSideMenu>
  )
}

CalendarView.auth = {
  permission: 'SUPERADMIN',
  loading: (
    <LayoutAuthenticated>
      <LayoutSideMenu>
        <Loader />
      </LayoutSideMenu>
    </LayoutAuthenticated>
  ),
}

export default CalendarView

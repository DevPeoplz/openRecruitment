import React from 'react'
import type { NextPageWithLayout } from '../_app'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { useRedirectionFlag } from '@/hooks/redirection'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import Loader from '@/components/ui/loader'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const CalendarView: NextPageWithLayout = () => {
  useRedirectionFlag()

  const locales = {
    'en-US': enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  return (
    <LayoutSideMenu>
      <div>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 1000 }}
        />
      </div>
    </LayoutSideMenu>
  )
}

CalendarView.auth = {
  loading: (
    <LayoutAuthenticated>
      <LayoutSideMenu>
        <Loader />
      </LayoutSideMenu>
    </LayoutAuthenticated>
  ),
}

export default CalendarView

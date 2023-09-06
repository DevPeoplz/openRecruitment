import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { Select } from '../UI/select'
import { Chart, GoogleChartOptions } from 'react-google-charts'
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays } from 'date-fns'
import { useQuery } from '@apollo/client'
import {
  GET_CANDIDATES_CREATED_AT_BY_DATE,
  get_candidates_created_at_by_date_variables,
} from '../graphql/queries'
import { countRecordsByDay } from '../utils/data-parsing'
import Link from 'next/link'
import Loader from '@/components/UI/loader'

export const filterGraphOptions = [
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'This week', value: 'thisWeek' },
  { label: 'This month', value: 'thisMonth' },
]

const dateFormat = 'MM-dd-yyyy'

const baseChartOptions: GoogleChartOptions = {
  backgroundColor: '#fff',
  legend: { position: 'none' },
  vAxis: { minValue: 0, gridlines: { interval: [1] }, viewWindow: { min: 0 } },
  hAxis: {
    format: dateFormat,
    gridlines: { interval: [1] },
    minorGridlines: { count: 0 },
  },
  chartArea: { width: '95%', height: '80%' },
  pointSize: 5,
  animation: {
    startup: true,
    easing: 'linear',
    duration: 300,
  },
}

function reducerChartOptions(state: GoogleChartOptions, action: string) {
  const currentDate = new Date()
  let dates = null

  switch (action) {
    case 'last7days':
      dates = { start: subDays(currentDate, 7), end: currentDate }
      break
    case 'last30days':
      dates = { start: subDays(currentDate, 30), end: currentDate }
      break
    case 'thisWeek':
      dates = {
        start: startOfWeek(currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(currentDate, { weekStartsOn: 1 }),
      }
      break
    case 'thisMonth':
      dates = { start: startOfMonth(currentDate), end: endOfMonth(currentDate) }
      break
    default:
      dates = null
  }

  return {
    ...state,
    hAxis: {
      ...(state.hAxis ?? {}),
      ...(dates ? { minValue: dates.start, maxValue: dates.end } : {}),
      ...(dates ? { viewWindow: { min: dates.start, max: dates.end } } : {}),
    },
  }
}

const filterTagSourceDataByReferrer = (candidatesData: { referrer: { name: string } }[]) => {
  const filterTags = new Map<string, { type: string; label: string; count: number }>()

  filterTags.set('careers site', {
    type: 'Careers Site',
    label: 'Applied via Careers Site',
    count: 0,
  })

  filterTags.set('linkedin', {
    type: 'LinkedIn',
    label: 'Applied via LinkedIn',
    count: 0,
  })

  filterTags.set('resume sent', {
    type: 'Resume Sent',
    label: 'Applied manually',
    count: 0,
  })

  filterTags.set('referral', {
    type: 'Referral',
    label: 'Source',
    count: 0,
  })

  if (!candidatesData) return Array.from(filterTags.values())

  for (const candidate of candidatesData) {
    const referrerName = candidate.referrer.name
    const type = referrerName.toLowerCase()

    if (!filterTags.has(type)) {
      filterTags.set(type, { type: type, label: referrerName, count: 0 })
    }

    const tag = filterTags.get(type)
    if (tag) {
      tag.count++
    }
  }

  // Convert the Map values to an array and sort it
  return Array.from(filterTags.values()).sort((a, b) => b.count - a.count)
}

const AppliedGraph: React.FC = () => {
  const [selectedGraphFilter, setSelectedGraphFilter] = useState('last30days')
  const [forceUpdate, setForceUpdate] = useState<object>()
  const [chartOptions, dispatchCartOptions] = useReducer(
    reducerChartOptions,
    reducerChartOptions(baseChartOptions, selectedGraphFilter)
  )

  const {
    data: dataCandidatesCreatedAt,
    loading: loadingCandidatesCreatedAt,
    refetch,
  } = useQuery(GET_CANDIDATES_CREATED_AT_BY_DATE, {
    variables: get_candidates_created_at_by_date_variables(
      chartOptions?.hAxis?.minValue,
      chartOptions?.hAxis?.maxValue
    ),
  })

  useEffect(() => {
    refetch(
      get_candidates_created_at_by_date_variables(
        chartOptions?.hAxis?.minValue,
        chartOptions?.hAxis?.maxValue
      )
    ).then()
  }, [chartOptions, refetch])

  const dataChart = useMemo(() => {
    const header = [
      { type: 'date', label: 'Day' },
      { type: 'number', label: 'Applicants' },
    ]
    const defaultDataChart = [header, [new Date(), 0]]

    if (loadingCandidatesCreatedAt) return defaultDataChart

    let data: [Date, number][] = []

    if (dataCandidatesCreatedAt?.findManyCandidate?.length) {
      data = countRecordsByDay(
        dataCandidatesCreatedAt.findManyCandidate.map(
          (item: { createdAt: string }) => item.createdAt
        ),
        dateFormat
      )
    }

    setForceUpdate({})
    return data.length > 0 ? [header, ...data] : defaultDataChart
  }, [dataCandidatesCreatedAt?.findManyCandidate, loadingCandidatesCreatedAt])

  return (
    <div className="w-full rounded border">
      <div className="flex items-center border-b py-4">
        <p className="px-4 text-lg font-semibold">Candidates</p>
        <Select
          list={filterGraphOptions}
          selected={selectedGraphFilter}
          onChange={(e) => {
            setSelectedGraphFilter(e)
            dispatchCartOptions(e)
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        {forceUpdate && (
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="AreaChart"
            loader={<Loader size={'h-60 w-60'} className={'m-5'} fullScreen={false} />}
            data={dataChart}
            options={chartOptions}
          />
        )}
      </div>
      <div className="mt-4 grid w-full grid-cols-4 gap-1 divide-x-2">
        {filterTagSourceDataByReferrer(dataCandidatesCreatedAt?.findManyCandidate)
          .slice(0, 4)
          .map((apply) => (
            <Link href={`/candidates?source=${apply.type.toLowerCase()}`} key={apply.type}>
              <div className="flex h-12 flex-col items-center justify-between">
                <p>{apply.label ? apply.label : apply.type}</p>
                <p className="font-bold">{apply.count ?? 0}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default AppliedGraph

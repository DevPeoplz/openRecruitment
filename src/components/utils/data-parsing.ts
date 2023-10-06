import { format, parseISO, startOfDay } from 'date-fns'

export function countRecordsByDay(
  createdAtStrings: string[],
  dateFormat: string
): [Date, number][] {
  const countsByDay: Record<string, number> = {}

  createdAtStrings.forEach((createdAtString) => {
    const createdAtDate = parseISO(createdAtString)
    const localDate = startOfDay(createdAtDate) // Adjust to the local date by setting time to 00:00:00
    const localDateString = format(localDate, dateFormat)

    if (!countsByDay[localDateString]) {
      countsByDay[localDateString] = 1
    } else {
      countsByDay[localDateString]++
    }
  })

  // Convert countsByDay to an array of arrays with [date, count]
  const resultArray: [string, number][] = Object.entries(countsByDay)

  // Sort the resultArray by date (first element of each sub-array)
  resultArray.sort((a, b) => a[0].localeCompare(b[0]))

  return resultArray.map((count) => [new Date(count[0]), count[1]])
}

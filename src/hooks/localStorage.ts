import { useCallback, useMemo, useState } from 'react'
import { getLocalStorageKey } from '@/components/utils'
import { useSession } from 'next-auth/react'

export const useLocalStorageState = <T>(
  menu: string,
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const { data: session } = useSession()

  const storageKey = useMemo(() => {
    if (!session?.user?.email || !session?.user?.selectedCompany) return ''

    return getLocalStorageKey(
      `${session?.user?.email}//${session?.user?.selectedCompany}`,
      menu,
      key
    )
  }, [menu, key, session?.user?.email, session?.user?.selectedCompany])

  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(storageKey) as string) as T

    if (!storedValue && defaultValue) {
      return defaultValue
    }

    return storedValue ? storedValue : (defaultValue as T)
  })

  const setLocalStorageValue = useCallback(
    (newValue: T) => {
      if (storageKey !== '') {
        localStorage.setItem(storageKey, JSON.stringify(newValue))
      }
      setValue(newValue as T)
    },
    [storageKey]
  )

  return [value, setLocalStorageValue]
}

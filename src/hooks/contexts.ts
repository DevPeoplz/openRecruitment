import { createContext } from 'react'

export const ModalControlContext = createContext<[boolean, (x: boolean) => void]>([
  false,
  () => null,
])

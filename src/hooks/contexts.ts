import { Dispatch, SetStateAction, createContext } from 'react'

export const ModalControlContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([
  false,
  () => false,
])

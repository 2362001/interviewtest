import React, { ReactNode, createContext } from 'react'
import { IGeneralInfo, IProduct } from '~/model'

interface AppContextProps {
  userInfo: IGeneralInfo[]
  dataProduct: IProduct[]
  dataProductPurchase: IProduct[]
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  customerCode: string
  isCallGetAll: boolean
  setIsCallGetAll: React.Dispatch<React.SetStateAction<boolean>>
}
const AppContext = createContext<AppContextProps | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
  value: AppContextProps
}

const AppDetailProvider: React.FC<AppProviderProps> = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppDetailProvider }

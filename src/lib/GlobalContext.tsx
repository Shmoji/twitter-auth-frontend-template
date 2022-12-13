import React, { useState } from 'react'
import { UserProfile } from 'types/customTypes'

interface GlobalContextState {
  jwtToken: null | string
  setJwtToken: (val: string) => void
  user: UserProfile
  setUser: (val: any) => void
}

export const initialState: GlobalContextState = {
  jwtToken: null,
  setJwtToken: (val: string) => {},
  user: {},
  setUser: (val: UserProfile) => {},
}

export const GlobalContext = React.createContext(initialState)

interface Props {}

export const GlobalContextComponent: React.FC<Props> = ({ children }: any) => {
  const [jwtToken, setJwtToken] = useState(null)
  const [user, setUser] = useState({})

  return (
    <GlobalContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

import { createContext, FC, PropsWithChildren, useContext, useState } from 'react'
import { connectAndCreateServerComm, ServerComm } from '../remote/client.ts'

const WSContext = createContext<{
  serverComm: null | ServerComm,
  tryToConnect: () => void,
}>({
  serverComm: null,
  tryToConnect: () => {
  },
})

export const WSProvider: FC<PropsWithChildren> = props => {
  const [serverComm, setServerComm] = useState<null | ServerComm>(null)
  return (
    <WSContext.Provider
      value={{
        serverComm,
        tryToConnect() {
          if (!serverComm) {
            const _serverComm = connectAndCreateServerComm()
            setServerComm(_serverComm)
          }
        },
      }}
    >
      {props.children}
    </WSContext.Provider>
  )
}

export const useWSContext = () => {
  return useContext(WSContext)
}

export const useServerCom = () => {
  const wsContextPure = useWSContext()
  if (!wsContextPure.serverComm) {
    throw new Error('Server Comm instance not found')
  }
  return {
    serverComm: wsContextPure.serverComm,
  }
}

import { FC, PropsWithChildren, useEffect } from 'react'
import { useWSContext, WSProvider } from '../context/WSContext.tsx'

export const WSConnectedLayout: FC<PropsWithChildren> = props => {
  return (
    <WSProvider>
      <InnerComp>
        {props.children}
      </InnerComp>
    </WSProvider>
  )
}

const InnerComp: FC<PropsWithChildren> = (props) => {
  const { serverComm, tryToConnect } = useWSContext()

  useEffect(() => {
    tryToConnect()
  }, [])

  if (!serverComm) {
    return (
      <section className="text-gray-700 p-8">
        <h1 className="text-2xl font-bold">Connessione in corso...</h1>
      </section>
    )
  }
  return (
    <>
      {props.children}
    </>
  )
}

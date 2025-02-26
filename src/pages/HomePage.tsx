import { FC } from 'react'
import { WSConnectedLayout } from '../layout/WSConnectedLayout.tsx'
import { useServerCom } from '../context/WSContext.tsx'


export default function HomePage() {
  return (
    <WSConnectedLayout>
      <InnerPage />
    </WSConnectedLayout>
  )
}

const InnerPage: FC = () => {
  const { serverComm } = useServerCom()

  return (
    <section className="p-8">
      Home Page
      <br />
      <button onClick={() => {
        serverComm.play_song()
      }}>
        Play song now
      </button>
      <button onClick={() => {
        serverComm.request_queue_play_state()
      }}>
        Get Queue Play State
      </button>

    </section>
  )
}

import { FC, useEffect, useState } from 'react'
import { WSConnectedLayout } from '../layout/WSConnectedLayout.tsx'
import { useServerCom } from '../context/WSContext.tsx'
import {
  CustomEventTypeNewWebSocketMessage,
  subscribeNewWebSocketMessage,
  unsubscribeNewWebSocketMessage,
} from '../events/event-server-comm.ts'
import { CustomEventFnType } from '../events/event-builder.ts'
import { parse_into_yaml } from '../lib/yaml_serializer.ts'
import { DialogPatchEditor } from '../components/patch/DialogPatchEditor.tsx'

export default function HomePage() {
  return (
    <WSConnectedLayout>
      <InnerPage />
    </WSConnectedLayout>
  )
}

const InnerPage: FC = () => {
  const { serverComm } = useServerCom()

  const [isOpenPatchEditorDialog, setOpenPatchEditorDialog] = useState(true)

  useEffect(() => {
    const listener: CustomEventFnType<
      CustomEventTypeNewWebSocketMessage
    > = event => {
      // TODO: Manage New Web Socket Message
      console.log(event)
    }
    subscribeNewWebSocketMessage(listener)
    return () => {
      unsubscribeNewWebSocketMessage(listener)
    }
  }, [])

  return (
    <section className='p-8'>
      Home Page
      <br />
      <button
        onClick={() => {
          serverComm.play_song()
        }}
      >
        Play song now
      </button>
      <button
        onClick={() => {
          serverComm.request_queue_play_state()
        }}
      >
        Get Queue Play State
      </button>
      <button
        onClick={() => {
          setOpenPatchEditorDialog(!isOpenPatchEditorDialog)
        }}
      >
        {isOpenPatchEditorDialog ? (
          <>Close Volca Drum Patch manager</>
        ) : (
          <>Open Volca Drum Patch manager</>
        )}
      </button>
      <div className='mt-3'>
        {isOpenPatchEditorDialog && (
          <DialogPatchEditor
            onClose={() => {
              setOpenPatchEditorDialog(false)
            }}
            onApply={volca_drum_patch => {
              const yaml_volca_drum_patch = parse_into_yaml(volca_drum_patch)
              if (yaml_volca_drum_patch) {
                serverComm.apply_volca_drum_patch(yaml_volca_drum_patch)
              } else {
                alert('Unable to parse Volca Drum Patch into YAML')
              }
            }}
          />
        )}
      </div>
    </section>
  )
}

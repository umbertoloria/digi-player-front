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
import { Song } from '../components/song/Song.tsx'
import { ISong, ITempoSnapshot } from '../remote/interface.ts'

export default function HomePage() {
  return (
    <WSConnectedLayout>
      <InnerPage />
    </WSConnectedLayout>
  )
}

const InnerPage: FC = () => {
  const { serverComm } = useServerCom()

  const [isOpenPatchEditorDialog, setOpenPatchEditorDialog] = useState(false)
  const [song, setSong] = useState<undefined | ISong>(undefined)
  const [tempoSnapshot, setTempoSnapshot] = useState<
    undefined | ITempoSnapshot
  >(undefined)

  useEffect(() => {
    const listener: CustomEventFnType<
      CustomEventTypeNewWebSocketMessage
    > = event => {
      // TODO: Manage New Web Socket Message

      if (event.detail.type === 'SongStarted') {
        setSong(event.detail.song)
      } else if (event.detail.type === 'SongPlayingUpdate') {
        setTempoSnapshot(event.detail.tempoSnapshot)
      } else {
        console.log('Unknown Event Type')
        console.log(event)
      }
    }
    subscribeNewWebSocketMessage(listener)
    return () => {
      unsubscribeNewWebSocketMessage(listener)
    }
  }, [])

  return (
    <section className='p-8'>
      <h1 className='text-2xl mb-3'>DiGi-Player</h1>
      <div className='flex flex-wrap gap-2'>
        <button
          className='btn-primary'
          onClick={() => {
            serverComm.play_song()
          }}
        >
          Play song now
        </button>
        <button
          className='btn-primary'
          onClick={() => {
            serverComm.request_queue_play_state()
          }}
        >
          Get Queue Play State
        </button>
        <button
          className='btn-primary'
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
      </div>
      <div className='mt-3'>
        {isOpenPatchEditorDialog && (
          <DialogPatchEditor
            onClose={() => {
              setOpenPatchEditorDialog(false)
            }}
            onApply={volca_drum_patch => {
              // Debug mode.
              console.log('Applying patch')
              console.log(volca_drum_patch)
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
      {!!song && (
        <div className='mt-3'>
          <Song song={song} tempoSnapshot={tempoSnapshot} />
        </div>
      )}
    </section>
  )
}

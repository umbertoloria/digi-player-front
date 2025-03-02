import { FC, useEffect } from 'react'
import { WSConnectedLayout } from '../layout/WSConnectedLayout.tsx'
import { useServerCom } from '../context/WSContext.tsx'
import {
  CustomEventTypeNewWebSocketMessage,
  subscribeNewWebSocketMessage,
  unsubscribeNewWebSocketMessage,
} from '../events/event-server-comm.ts'
import { CustomEventFnType } from '../events/event-builder.ts'
import { parse_into_yaml } from '../lib/yaml_serializer.ts'
import { VolcaDrumPatch } from '../lib/volca_drum_patch.ts'

export default function HomePage() {
  return (
    <WSConnectedLayout>
      <InnerPage />
    </WSConnectedLayout>
  )
}

const InnerPage: FC = () => {
  const { serverComm } = useServerCom()

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
          // TODO: Create dialog for managing Volca Drum Patches
          const volce_drum_patch: VolcaDrumPatch = {
            kick: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
            hh: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
            snare: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
            sound4: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
            sound5: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
            sound6: {
              sound_src_type: 'WaveSine',
              mod_type: 'ModTri',
              amp_eg: 'EnvExp',
              level: 10,
              pitch: 10,
              eg_attack: 10,
              eg_release: 10,
              mod_amount: 10,
              mod_rate: 10,
            },
          }

          const yaml_volca_drum_patch = parse_into_yaml(volce_drum_patch)
          if (yaml_volca_drum_patch) {
            serverComm.apply_volca_drum_patch(yaml_volca_drum_patch)
          } else {
            alert('Unable to parse Volca Drum Patch into YAML')
          }
        }}
      >
        Apply patch
      </button>
    </section>
  )
}

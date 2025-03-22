import { fireNewWebSocketMessage } from '../events/event-server-comm.ts'
import { ISong, ITempoSnapshot } from './interface.ts'

export type ServerComm = {
  play_song: () => void
  request_queue_play_state: () => void
  apply_volca_drum_patch: (yaml_volca_drum_patch: string) => void
}
export const connectAndCreateServerComm = (): ServerComm => {
  const socket = new WebSocket('ws://localhost:8666')
  socket.addEventListener('close', () => {
    location.reload()
  })
  socket.addEventListener('message', event => {
    // console.log('New message received')
    // console.log(event)

    const message = event.data
    if (typeof message === 'string') {
      // console.log(message)

      if (message.startsWith('SONG_STARTED:\n')) {
        const json = message.substring(14)

        // TODO: Validate first
        const song: ISong = JSON.parse(json)

        fireNewWebSocketMessage({
          type: 'SongStarted',
          song,
        })
      }

      if (message.startsWith('SONG_PLAYING_UPDATE:\n')) {
        const json = message.substring(21)

        // TODO: Validate first
        const tempoSnapshot: ITempoSnapshot = JSON.parse(json)

        fireNewWebSocketMessage({
          type: 'SongPlayingUpdate',
          tempoSnapshot,
        })
      }

      //
    } else {
      console.error('Not a string :(')
      console.error(message)
    }
  })

  return {
    play_song() {
      socket.send('PLAY_SONG')
    },
    request_queue_play_state() {
      socket.send('GET_PLAY_QUEUE_STATE')
    },
    apply_volca_drum_patch(yaml_volca_drum_patch: string) {
      socket.send('APPLY_PATCH\n' + yaml_volca_drum_patch)
    },
  }
}

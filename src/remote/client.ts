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
    console.log('New message received')
    // console.log(event)
    console.log(event.data)
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

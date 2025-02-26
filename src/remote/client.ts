export type ServerComm = {
  play_song: () => void,
  request_queue_play_state: () => void,
}
export const connectAndCreateServerComm = (): ServerComm => {
  const socket = new WebSocket('ws://localhost:8666')
  socket.addEventListener('close', () => {
    location.reload()
  })

  return {
    play_song() {
      socket.send('PLAY_SONG')
    },
    request_queue_play_state() {
      socket.send('GET_PLAY_QUEUE_STATE')
    },
  }
}

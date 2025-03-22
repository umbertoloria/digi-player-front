import { buildCustomEvent } from './event-builder.ts'
import { ISong, ITempoSnapshot } from '../remote/interface.ts'

export type CustomEventTypeNewWebSocketMessage =
  | {
      type: 'SongStarted'
      song: ISong
    }
  | {
      type: 'SongPlayingUpdate'
      tempoSnapshot: ITempoSnapshot
    }
export const {
  subscribe: subscribeNewWebSocketMessage,
  unsubscribe: unsubscribeNewWebSocketMessage,
  fire: fireNewWebSocketMessage,
} = buildCustomEvent<CustomEventTypeNewWebSocketMessage>('NewWebSocketMessage')

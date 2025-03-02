import { buildCustomEvent } from './event-builder.ts'

export type CustomEventTypeNewWebSocketMessage = undefined
export const {
  subscribe: subscribeNewWebSocketMessage,
  unsubscribe: unsubscribeNewWebSocketMessage,
  fire: fireNewWebSocketMessage,
} = buildCustomEvent<CustomEventTypeNewWebSocketMessage>('NewWebSocketMessage')

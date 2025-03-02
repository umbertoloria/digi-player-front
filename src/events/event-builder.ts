export type CustomEventFnType<T> = (event: CustomEvent<T>) => void

export function buildCustomEvent<T>(eventName: string) {
  return {
    subscribe(listener: CustomEventFnType<T>) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.addEventListener(eventName, listener)
    },
    unsubscribe(listener: CustomEventFnType<T>) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.removeEventListener(eventName, listener)
    },
    fire(data: T) {
      const event = new CustomEvent<T>(eventName, {
        detail: data,
      })
      window.dispatchEvent(event)
    },
  }
}

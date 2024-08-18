type ObserverCallback = () => void

export const createObserver = () => {
  let observer: ObserverCallback | null = null

  const setObserver = (callback: ObserverCallback) => {
    observer = callback
  }

  const notify = () => {
    if (observer) {
      observer()
    }
  }

  return { setObserver, notify }
}
export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // notify listeners if they exist
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // subscribe for notifications
  // adding new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
// example
// const emitter = new Emitter()
// const unsub = emitter.subscribe('stepan', data => console.log('Sub: ', data))
// emitter.emit('stepan', 42)
// emitter.emit('stepan', 42)
//
// setTimeout(() => {
//   emitter.emit('stepan', 'after 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('stepan', 'after 4 seconds')
// }, 4000)

import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // prepare our component before init
  prepare() {
  }

  // returns component template
  toHTML() {
    return '';
  }

  // Уведомляем слушаталей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // sub on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // init component
  // adding dom listeners
  init() {
    this.initDomListeners()
  }

  // delete component
  // clear listeners
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}

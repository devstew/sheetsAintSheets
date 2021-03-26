import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} is not implemented in ${name} Component`)
      }
      // same as addEventListener
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

// click => onClick
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

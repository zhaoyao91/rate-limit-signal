class RateLimitSignal {
  constructor ({interval = 1000, count = 1} = {}) {
    this._interval = interval
    this._count = count
    this._queue = []
  }

  _start () {
    if (!this._timer) {
      this._timer = setInterval(() => {
        if (this._queue.length === 0) this._stop()
        else this._pass(this._count)
      }, this._interval)
    }
  }

  _stop () {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  _pass (count = Infinity) {
    const resolves = this._queue.splice(0, count)
    resolves.forEach(resolve => resolve())
  }

  wait () {
    return new Promise(resolve => {
      this._queue.push(resolve)
      this._start()
    })
  }
}

module.exports = RateLimitSignal

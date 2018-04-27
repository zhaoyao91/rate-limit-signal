class RateLimitSignal {
  constructor ({interval = 1000, count = 1} = {}) {
    this._interval = interval
    this._count = count
    this._queue = []
  }

  start () {
    this.stop()
    this._timer = setInterval(() => {
      this.pass(this._count)
    }, this._interval)
  }

  stop () {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  pass (count = Infinity) {
    const resolves = this._queue.splice(0, count)
    resolves.forEach(resolve => resolve())
  }

  wait () {
    return new Promise(resolve => {
      this._queue.push(resolve)
    })
  }
}

module.exports = RateLimitSignal

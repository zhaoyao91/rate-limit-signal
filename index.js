function buildSignal (interval = 1000) {
  const stopped = false
  const queue = []

  const timer = setInterval(() => {
    if (queue.length > 0) {
      queue.shift()()
    }
  }, interval)

  function signal () {
    if (stopped) {
      throw new Error('This signal has been stopped')
    }
    return new Promise((resolve) => {
      queue.push(resolve)
    })
  }

  signal.stop = function () {
    clearInterval(timer)
    return queue
  }

  return signal
}

module.exports = buildSignal

const RateLimitSignal = require('./signal')

function buildSignal(options) {
  const signal = new RateLimitSignal(options)
  return signal.wait.bind(signal)
}

module.exports = buildSignal

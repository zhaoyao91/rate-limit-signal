const buildSignal = require('./index')

const signal = buildSignal(2000)

for (let i = 0; i < 10; i++) {
  signal().then(() => console.log(i))
}

setTimeout(() => {
  const queue = signal.stop()
  console.log('stopped')
  setTimeout(() => {
    console.log('resolve rest')
    queue.forEach(x => x())
  }, 5000)
}, 5000)

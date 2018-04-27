# Rate Limit Signal

Limit rate by waiting a signal.

## Installation

```
npm install rate-limit-sigal
```

## Usage


``` ecmascript6
const Signal = require('rate-limit-signal')

const signal = new Signal({
  interval: 1000,
  count: 1,
})

signal.start()

async function task() {
  await signal.wait()
  // do something
}

task()
task()
...

signal.stop()
```

## API

### Signal

- type: class
- methods:
  - constructor: ({interval, count}) => signal
    - interval?: Number = 1000 - milliseconds
    - count?: Number = 1
  - start: () => Void
  - stop: () => Void
  - pass: (count) => Void - force to resolve some items
    - count? Number = Infinity

## License

MIT
# Rate Limit Signal

Limit rate by waiting a signal.

## Installation

```
npm install rate-limit-sigal
```

## Usage


``` ecmascript6
const buildSignal = require('rate-limit-signal')

const signal = buildSignal({
  interval: 1000, // milliseconds, default to 1000
  count: 1, // how many items will pass per interval, default to 1
})

async function task() {
  await signal()
  // do something
}

task()
task()
...
```

## License

MIT
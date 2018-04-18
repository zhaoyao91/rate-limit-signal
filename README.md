# Rate Limit Signal

Limit rate by waiting a signal.

## Installation

```
npm install rate-limit-rate
```

## Usage

``` ecmascript6
const buildSignal = require('rate-limit-signal')

const signal = buildSignal(666) // arg is the interval of milliseconds

async function task() {
  await signal()
  // do something
}

const queue = signal.stop()
// the signal is stopped forever
// the returned queue is an array of resolve functions of rest promises of signal-waiting
```

## License

MIT
const sleep = require('sleep-promise')
const Signal = require('./signal')
const buildSignal = require('./index')

describe('Signal', function () {
  it('should call function at default rate', async () => {
    const records = []

    const signal = new Signal()

    async function func (arg) {
      await signal.wait()
      records.push(arg)
    }

    func(1)
    func(2)

    await sleep(900)
    expect(records).toEqual([])
    await sleep(100)
    expect(records).toEqual([1])
    await sleep(900)
    expect(records).toEqual([1])
    await sleep(100)
    expect(records).toEqual([1, 2])
  })

  it('should call function at configured rate', async () => {
    const records = []

    const signal = new Signal({
      interval: 100,
      count: 2
    })

    async function func (arg) {
      await signal.wait()
      records.push(arg)
    }

    func(1)
    func(2)
    func(3)
    func(4)

    await sleep(90)
    expect(records).toEqual([])
    await sleep(10)
    expect(records).toEqual([1, 2])
    await sleep(90)
    expect(records).toEqual([1, 2])
    await sleep(10)
    expect(records).toEqual([1, 2, 3, 4])
  })

  it('should stop the timer if queue is empty', async () => {
    const records = []

    const signal = new Signal({
      interval: 100,
      count: 1
    })

    async function func (arg) {
      await signal.wait()
      records.push(arg)
    }

    func(1)

    await sleep(100)
    expect(records).toEqual([1])
    await sleep(100)
    expect(signal._timer).toBeFalsy()
  })

  it('should build a simple signal func', async () => {
    const records = []

    const signal = buildSignal({
      interval: 100,
      count: 2
    })

    async function func (arg) {
      await signal()
      records.push(arg)
    }

    func(1)
    func(2)
    func(3)
    func(4)

    await sleep(90)
    expect(records).toEqual([])
    await sleep(10)
    expect(records).toEqual([1, 2])
    await sleep(90)
    expect(records).toEqual([1, 2])
    await sleep(10)
    expect(records).toEqual([1, 2, 3, 4])
  })
})
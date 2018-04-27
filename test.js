const sleep = require('sleep-promise')
const Signal = require('./index')

describe('Signal', function () {
  it('should call function at default rate', async () => {
    const records = []

    const signal = new Signal()
    signal.start()

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
    signal.start()

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

  it('should stop the signal', async () => {
    const records = []

    const signal = new Signal({
      interval: 100,
      count: 2
    })
    signal.start()

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
    signal.stop()
    await sleep(200)
    expect(records).toEqual([1, 2])
  })

  it('should pass some waiting items', async () => {
    const records = []

    const signal = new Signal({
      interval: 100,
      count: 2
    })
    signal.start()

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
    signal.stop()
    await sleep(200)
    expect(records).toEqual([1, 2])
    signal.pass(1)
    await sleep(1)
    expect(records).toEqual([1, 2, 3])
  })
})
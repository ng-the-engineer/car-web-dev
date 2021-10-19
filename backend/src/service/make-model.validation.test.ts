import { validate } from './make-model.validation'

describe('Service > Make-Model validation', () => {
  test('Return true if make and model pair exist in the map', () => {
    const actual = validate('HONDA', 'FREED')
    expect(actual).toBe(true)
  })

  test('Return true if make and model pair exist in the map using small capital letters', () => {
    const actual = validate('Honda', 'freed')
    expect(actual).toBe(true)
  })

  test('Return false if make does not exist in the map', () => {
    const actual = validate('Ferrari', 'whatever')
    expect(actual).toBe(false)
  })

  test('Return false if make exist but model does not exist', () => {
    const actual = validate('JAGUAR', 'Model not exist')
    expect(actual).toBe(false)
  })
})

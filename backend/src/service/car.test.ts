import { Color, Make } from '../data/car/model'
import { addCar, getCar, updateCar } from './car'

describe('Car service', () => {
  test('Add car', async () => {
    const car = {
      make: Make.HONDA,
      model: 'Civic',
      color: Color.SILVER,
      year: 2015,
    }
    const actual = await addCar(car)
    expect(actual.id).not.toBeUndefined
    expect(actual.make).toBe(Make.HONDA)
    expect(actual.model).toBe('Civic')
    expect(actual.year).toBe(2015)
  })

  test('Succeed to get car if the id is valid', () => {
    const actual = getCar(1)
    expect(actual.id).toBe(1)
    expect(actual.make).toBe(Make.HONDA)
    expect(actual.model).toBe('Civic')
    expect(actual.color).toBe(Color.SILVER)
    expect(actual.year).toBe(2015)
  })

  test('Failed to get car if the id does not exist', () => {
    const idNotExist = 9999
    expect(() => {
      getCar(idNotExist)
    }).toThrowError()
  })

  test('Succeed to update car if the id is valid', () => {
    const car = {
      make: Make.HONDA,
      model: 'Civic',
      color: Color.WHITE,
      year: 2018,
    }
    const actual = updateCar(1, car)
    expect(actual?.id).toBe(1)
    expect(actual?.make).toBe(Make.HONDA)
    expect(actual?.model).toBe('Civic')
    expect(actual?.color).toBe(Color.WHITE)
    expect(actual?.year).toBe(2018)
  })

  test('Failed to update car if the id does not exist', () => {
    const car = {
      make: Make.HONDA,
      model: 'Civic',
      color: Color.WHITE,
      year: 2018,
    }
    expect(() => {
      updateCar(9999, car)
    }).toThrowError()
  })
})

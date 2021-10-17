import { Car } from './model'

const carMap: Map<number, Car> = new Map()

export const insert = (car: Car): Car | undefined => {
  const newId = carMap.size + 1
  car.id = newId
  carMap.set(newId, car)
  return carMap.get(newId)
}

export const getOne = (id: number): Car | undefined => {
  return carMap.get(id)
}

export const update = (id: number, car: Car): Car | undefined => {
  if (carMap.get(id)) {
    console.log('good')
    carMap.delete(id)
    car.id = id
    carMap.set(id, car)
    return carMap.get(id)
  }
  console.log('fail')
  return undefined
}

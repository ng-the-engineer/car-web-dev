import { Car } from '../data/car/model'
import { insert, getOne, update } from '../data/car/database'

export const addCar = async (car: Car): Promise<Car | never> => {
  const addedCar = await insert(car)
  if (!addedCar) throw new Error('Failed to add car')
  return addedCar
}

export const getCar = async (id: string): Promise<Car | never> => {
  const car = await getOne(id)
  if (!car) throw new Error(`Failed to get car id=${id}`)
  return car
}

export const updateCar = async (id: string, car: Car): Promise<Car | never> => {
  const updatedCar = await update(id, car)
  if (!updatedCar) throw new Error(`Failed to update car id=${id}`)
  return updatedCar
}

import { Car } from '../data/car/model'
import { insert, getOne, update, remove } from '../data/car/database'
import { enrich } from './enrichment'

export async function addCar(car: Car): Promise<Car | never> {
  const addedCar = await insert(car)
  if (!addedCar) throw new Error('Failed to add car')
  return addedCar
}

export const getCar = async (id: string): Promise<Car | never> => {
  const car = await getOne(id)
  if (!car) throw new Error(`Failed to get car id=${id}`)

  const { make, model, color, year } = car
  const modelAlike = car?.model ? await enrich(car.model) : ''

  return {
    id,
    make,
    model,
    color,
    year,
    modelAlike,
  }
}

export const updateCar = async (id: string, car: Car): Promise<Car | never> => {
  const updatedCar = await update(id, car)
  if (!updatedCar) throw new Error(`Failed to update car id=${id}`)
  return updatedCar
}

export const deleteCar = async (id: string): Promise<void> => {
  const deleteSuccessful = await remove(id)
  if (!deleteSuccessful) throw new Error(`Failed to remove car id=${id}`)
}

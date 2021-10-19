import { Car } from './model'
import { CarModel } from './schema'
import mongoose from 'mongoose'

export const insert = async (car: Car): Promise<Car> => {
  const carModel = new CarModel({
    make: car.make,
    model: car.model,
    year: car.year,
    color: car.color,
  })
  const result = await carModel.save()
  car.id = result._id.valueOf()
  return car
}

export const getOne = async (id: string): Promise<Car | undefined> => {
  const objId = new mongoose.Types.ObjectId(id)
  const result = await CarModel.findById(objId)
  return result
}

export const update = async (
  id: string,
  car: Car,
): Promise<Car | undefined> => {
  const { make, model, year, color } = car
  const result = await CarModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { make, model, year, color },
    { new: true },
  )
  return result
}

export const remove = async (id: string): Promise<boolean> => {
  const objId = new mongoose.Types.ObjectId(id)
  const result = await CarModel.deleteOne({ _id: objId })
  console.log('delete result:', result)
  return result.deletedCount === 1
}

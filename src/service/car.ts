import { Car } from "../data/car/model";
import { insert, getOne, update } from '../data/car/database'

export const addCar = (car: Car) : Car | never => {
    const addedCar = insert(car)
    if (!addedCar) throw new Error('Fail to add car')
    return addedCar
}

export const getCar = (id: number) : Car | never => {
    const car = getOne(id)
    if (!car) throw new Error(`Fail to get car id=${id}`)
    return car
}

export const updateCar = (id: number, car: Car) : Car | never => {
    const updatedCar = update(id, car)
    if(!updatedCar) throw new Error(`Fail to update car id=${id}`)
    return updatedCar
}
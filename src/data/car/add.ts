import { Car } from "./model"

const add = (car: Car) : Car => {
    // save car
    const savedCar : Car = car  // id will be created on car
    return savedCar
}

export default add
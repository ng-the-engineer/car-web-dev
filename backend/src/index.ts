import express from 'express'
import { Car, Color } from './data/car/model'
import { addCar, getCar, updateCar } from './service/car'
import mongoose from 'mongoose'
import { validate } from './service/make-model.validation'
import { makeModelMap } from './data/car/make-model.map'

const app = express()
const port = 8088
const colorList: string[] = Object.keys(Color).filter(key => isNaN(Number(key)))

app.use(express.json())

app.get('/car/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (!id) throw Error('id cannot be empty')
    const car = await getCar(id)
    res.status(200).json(car)
  } catch (e) {
    res.status(422).json({ message: `Car id ${id} is not found` })
  }
})

app.post('/car', async (req, res) => {
  const { make, model, year, color } = req.body
  if (!make) {
    res.status(422).json({
      message: `Attribute [make] is required`,
    })
    return
  }

  if (!model) {
    res.status(422).json({ message: `Attribute [model] is required` })
    return
  }

  if (!validate(make.toUpperCase(), model.toUpperCase())) {
    res
      .status(422)
      .json({
        message: `Make and model does exist in our list. ${JSON.stringify(
          Object.fromEntries(makeModelMap),
        )}`,
      })
    return
  }

  if (!year || !Number.isInteger(year) || !(year >= 1900 && year < 2022)) {
    res.status(422).json({
      message: `Attribute [year] is required and an integer between 1900 to 2021`,
    })
    return
  }

  if (!color || !colorList.includes(color)) {
    res.status(422).json({
      message: `Attribute [color] is required and has to be a value in [${colorList}]`,
    })
    return
  }

  const car: Car = {
    make,
    model,
    year,
    color,
  }

  try {
    const addedCar = await addCar(car)
    res.status(200).json(addedCar)
  } catch (e: unknown) {
    res.status(422).json(e)
  }
})

app.put('/car/:id', async (req, res) => {
  const { id } = req.params
  const { make, model, color, year } = req.body

  const car = {
    make,
    model,
    color,
    year,
  }

  if (!make && !model && !color && !year) {
    res.status(422).json({ message: `At least one attribute need to update` })
    return
  }

  try {
    const updatedCar = await updateCar(id, car)
    res.status(200).json(updatedCar)
  } catch (e: unknown) {
    res.status(422).json({ message: `Car id ${id} is not found` })
  }
})

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_ADDRESS}:27017/car-web-app?authSource=admin`,
  (err: unknown) => {
    if (err) {
      console.log('Failed to connect to MongoDB', err)
    }

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  },
)

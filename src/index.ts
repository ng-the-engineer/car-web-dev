import express from 'express'
import { Car, Make, Color } from './data/car/model'
import { addCar, getCar, updateCar } from './service/car'

const app = express()
const port = 8088
const makeList: string[] = Object.keys(Make).filter(key => isNaN(Number(key)))
const colorList: string[] = Object.keys(Color).filter(key => isNaN(Number(key)))

app.use(express.json())

app.get('/car/:id', (req, res) => {
  const { id } = req.params
  try {
    const car = getCar(parseInt(id))
    res.status(200).json(car)
  } catch (e) {
    res.status(422).json({ message: `Car id ${id} is not found` })
  }
})

app.post('/car', (req, res) => {
  const { make, model, year, color } = req.body

  if (!make || !makeList.includes(make)) {
    res
      .status(422)
      .json({
        message: `Attribute [make] is required or has to be a value in [${makeList}]`,
      })
  }

  if (!model) {
    res.status(422).json({ message: `Attribute [model] is required` })
  }

  if (!year || !Number.isInteger(year) || !(year >= 1900 && year < 2022)) {
    res
      .status(422)
      .json({
        message: `Attribute [year] is required and an integer between 1900 to 2021`,
      })
  }

  if (!color || !colorList.includes(color)) {
    res
      .status(422)
      .json({
        message: `Attribute [color] is required and has to be a value in [${colorList}]`,
      })
  }

  const car: Car = {
    make,
    model,
    year,
    color,
  }
  try {
    const addedCar = addCar(car)
    res.status(200).json(addedCar)
  } catch (e: unknown) {
    res.status(422).json(e)
  }
})

app.put('/car/:id', (req, res) => {
  const { id } = req.params
  const { make, model, color, year } = req.body

  const car = {
    make,
    model,
    color,
    year,
  }

  try {
    const updatedCar = updateCar(parseInt(id), car)
    res.status(200).json(updatedCar)
  } catch (e: unknown) {
    res.status(422).json({ message: `Car id ${id} is not found` })
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

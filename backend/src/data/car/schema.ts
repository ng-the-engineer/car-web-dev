import mongoose from 'mongoose'

const Schema = mongoose.Schema

const carSchema = new Schema({
  make: String,
  model: String,
  color: String,
  year: Number,
})

export const CarModel = mongoose.model('Car', carSchema)

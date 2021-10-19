import { makeModelMap } from '../data/car/make-model.map'

export const validate = (make: string, model: string): boolean => {
  const entry = makeModelMap.get(make.toUpperCase())
  if (!entry) return false

  return entry.includes(model.toUpperCase())
}

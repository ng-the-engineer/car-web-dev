import { Make, Color } from './model'
import add from './add'

describe('Add a car', () => {
    test('Save a car successfully if model is not empty and year is valid', () => {
        const car = {
            make: Make.HONDA,
            model: 'Civic',
            color: Color.SILVER,
            year: 2010
        }
        const actual = add(car)

        // Assert id
        expect(actual.id).not.toBeUndefined()  // it is false until the save logic is implemented
        expect(actual.make).toBe(Make.HONDA)
        expect(actual.model).toBe('Civic')
        expect(actual.color).toBe(Color.SILVER)
        expect(actual.year).toBe(2010)
    })
})
import { Color, Make } from '../data/car/model'
import * as carService from './car'
import * as database from '../data/car/database'
import * as enrichment from './enrichment'

const carToAdd = {
  make: Make.HONDA,
  model: 'whatever',
  color: Color.SILVER,
  year: 2015,
}

const carToUpdate = {
  make: Make.HONDA,
  model: 'Civic',
  color: Color.WHITE,
  year: 2018,
}

const carCreated1 = {
  make: Make.TOYOTA,
  model: 'mocked model',
  year: 2013,
  color: Color.GREEN,
}

const carCreated2 = {
  id: 'J01',
  make: Make.JAGUAR,
  model: 'mocked model',
  year: 2016,
  color: Color.WHITE,
}

const carUpdated = {
  id: 'H01',
  make: Make.HONDA,
  model: 'mocked model',
  color: Color.WHITE,
  year: 2018,
}

const modelEnriched = 'A string of similar models'

const carEnriched = {
  ...carCreated2,
  modelAlike: modelEnriched,
}

describe('Service > car', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Succeed to add car', async () => {
    const mockInsert = jest.spyOn(database, 'insert')
    mockInsert.mockResolvedValueOnce(carCreated1)
    await expect(carService.addCar(carToAdd)).resolves.toStrictEqual(
      carCreated1,
    )
  })

  test('Failed to add a car', async () => {
    const mockInsert = jest.spyOn(database, 'insert')
    mockInsert.mockRejectedValueOnce(undefined)
    await expect(carService.addCar(carToAdd)).rejects.toBeUndefined()
  })

  test('Succeed to get car if the id is valid', async () => {
    const mockGetOne = jest.spyOn(database, 'getOne')
    const mockEnrich = jest.spyOn(enrichment, 'enrich')
    mockGetOne.mockResolvedValueOnce(carCreated2)
    mockEnrich.mockResolvedValueOnce(modelEnriched)
    await expect(carService.getCar('J01')).resolves.toStrictEqual(carEnriched)
  })

  test('Failed to get car if the id does not exist', async () => {
    const mockGetOne = jest.spyOn(database, 'getOne')
    mockGetOne.mockRejectedValueOnce(undefined)
    await expect(carService.getCar('ID_NOT_EXIST')).rejects.toBeUndefined()
  })

  test('Succeed to update car if the id is valid', async () => {
    const mockInsert = jest.spyOn(database, 'update')
    mockInsert.mockResolvedValueOnce(carUpdated)
    await expect(
      carService.updateCar('H01', carToUpdate),
    ).resolves.toStrictEqual(carUpdated)
  })

  test('Failed to update car if the id does not exist', async () => {
    const mockUpdate = jest.spyOn(database, 'update')
    mockUpdate.mockRejectedValueOnce(undefined)
    await expect(
      carService.updateCar('H99', carToUpdate),
    ).rejects.toBeUndefined()
  })
})

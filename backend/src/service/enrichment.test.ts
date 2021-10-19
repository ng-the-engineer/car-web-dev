import { enrich } from './enrichment'
import axios, { AxiosResponse } from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedSuccessResponse: AxiosResponse | undefined = {
  data: [
    {
      word: 'whatever',
      score: 95,
      numSyllables: 3,
    },
    {
      word: 'whenever',
      score: 95,
      numSyllables: 3,
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const mockedFailingResponse: AxiosResponse | undefined = undefined

const mockedServerErrorResponse = {
  data: [],
  status: 500,
  statusText: 'ERROR',
  headers: {},
  config: {},
}

describe('Enrichment', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Succeed to call enrich() if model is a valid word', async () => {
    mockedAxios.get.mockResolvedValue(mockedSuccessResponse)
    expect(axios.get).not.toHaveBeenCalled()
    const actual = await enrich('Model X')
    expect(axios.get).toHaveBeenCalled()
    expect(actual).toBe('whatever, whenever')
  })

  test('Failed to call enrich() if API return undefined', async () => {
    mockedAxios.get.mockResolvedValue(mockedFailingResponse)
    expect(axios.get).not.toHaveBeenCalled()
    const result = await enrich('whatever')
    expect(axios.get).toHaveBeenCalled()
    expect(result).toBe('')
  })

  test('Failed to call enrich() if API return 500', async () => {
    mockedAxios.get.mockResolvedValue(mockedServerErrorResponse)
    expect(axios.get).not.toHaveBeenCalled()
    const result = await enrich('whatever')
    expect(axios.get).toHaveBeenCalled()
    expect(result).toBe('')
  })
})

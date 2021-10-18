import { enrich } from './enrichment'

describe('Enrichment', () => {
  test('Succeed to enrich if model is a valid word', async () => {
    const actual = await enrich('Model X')
    expect(actual.length).toBeGreaterThan(0)
  })

  test('Failed to enrich if model is empty', async () => {
    const actual = await enrich('')
    expect(actual.length).toBe(0)
  })
})

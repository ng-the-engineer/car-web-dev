import axios, { AxiosResponse } from 'axios'
import { EnrichResultType } from './enrichment.types'

export const enrich = async (model: string): Promise<string> => {
  try {
    const result: AxiosResponse = await axios.get(
      `https://api.datamuse.com/words?sl=${model}`,
    )

    if (!result) throw Error('Error when calling enrich API')

    const wordResult = result.data as EnrichResultType
    return wordResult.map(entry => entry.word).join(', ')
  } catch (err) {
    console.log(`${err} with word [${model}]`)
    return ''
  }
}

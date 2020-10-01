import { Sample } from '../db/model/Sample'
import { DB } from '../app/config/Spring'

export const insert = async (data: Sample): Promise<Sample> => {
  await DB.insert(data)
  return data
}

export const select = async (data: { id: string }): Promise<Sample> => {
  return await DB.select(data.id)
}

export const scan = async (): Promise<Sample[]> => {
  return await DB.scan()
}

export const update = async (data: Sample): Promise<Sample> => {
  return await DB.update(data)
}

export const del = async (data: { id: string }): Promise<{}> => {
  await DB.delete(data.id)
  return {}
}

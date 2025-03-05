import { createClient } from 'redis'
import { loadEnv } from '../env'

export async function redisConnect() {
  const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
  const url = `redis://${redisHost}:6379`
  const client = createClient({ url })
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()
  return client
}

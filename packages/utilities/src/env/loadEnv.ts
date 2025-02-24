import { AppEnv } from './env.types'

/**
 * This is a wrapper function which adds the expectations for typing onto process.env
 *
 * This makes it easier to work with the properties in TypeScript and improves mockability in unit tests.
 * @returns AppEnv
 */
export default function loadEnv(): AppEnv {
  return (process.env ?? {}) as unknown as AppEnv
}

export interface AppEnv {
  BEAR_APP_DATA_DIR: string
  EXTRACTOR_TYPE: 'bear' | 'file'
  EXTRACTOR_SCHEDULE: string
  ASSETS_DIR: string
  REDIS_HOST: string
}

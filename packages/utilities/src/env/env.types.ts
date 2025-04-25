export interface AppEnv {
  ASSETS_DIR: string
  BEAR_APP_DATA_DIR: string
  EXTRACTOR_SCHEDULE: string
  EXTRACTOR_TYPE: 'bear' | 'file'
  REDIS_HOST: string
}

import baseConfig from '../../eslint.base.config.mjs'
import nx from '@nx/eslint-plugin'

export default [
  ...baseConfig,
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
]

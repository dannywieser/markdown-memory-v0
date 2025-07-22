export default {
  coverageDirectory: '../../coverage/packages/extractor-bear',
  displayName: '@markdown-memory/extractor-bear',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(marked)/)'],
}

export default {
  coverageDirectory: '../../coverage/packages/markdown',
  displayName: '@markdown-memory/markdown',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
}

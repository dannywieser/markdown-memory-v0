export default {
  coverageDirectory: '../../coverage/apps/api',
  displayName: 'api',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
}

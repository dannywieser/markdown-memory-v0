export default {
  coverageDirectory: '../../coverage/apps/extractor',
  displayName: 'extractor',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
}

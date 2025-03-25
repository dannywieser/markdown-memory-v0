const nxPreset = require('@nx/jest/preset').default

module.exports = {
  ...nxPreset,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.types.ts',
    '!src/**/index.ts',
    '!src/**/mocks.ts',
    '!src/**/types.ts',
    '!src/**/types/**',
    '!src/**/*.styles.ts',
  ],
  outputDirectory: './coverage',
  coverageReporters: [
    'cobertura',
    'html',
    'json',
    'jest-junit',
    'text',
    'text-summary',
  ],
}

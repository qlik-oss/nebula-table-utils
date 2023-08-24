/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testRegex: 'src/.+\\.(test|spec)\\.[jt]sx?$',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '@qlik-trial/sprout/icons/.*': '<rootDir>/test-utils/sprout-icons-mock.tsx',
  },
  coveragePathIgnorePatterns: ['dist', 'lib', 'build-utils', './src/constants'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(cliui|wrap-ansi)/*)'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};

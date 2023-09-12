/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testRegex: 'src/.+\\.(test|spec)\\.[jt]sx?$',
  transform: {
    '\\.js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '@qlik-trial/sprout/icons/.*': '<rootDir>/test-utils/sprout-icons-mock.tsx',
  },
  coveragePathIgnorePatterns: ['dist', 'lib', 'build-utils', './src/constants'],
  transformIgnorePatterns: ['node_modules/.pnpm/(?!(cliui|wrap-ansi|d3-color)@)'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};

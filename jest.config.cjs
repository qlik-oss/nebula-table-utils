/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testRegex: 'src/.+\\.(test|spec)\\.[jt]sx?$',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  coveragePathIgnorePatterns: ['dist', 'lib', 'build-utils'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(cliui|wrap-ansi)/*)'],
};

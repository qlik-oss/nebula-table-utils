export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testRegex: 'src/.+\\.(test|spec)\\.[jt]sx?$',
  transform: {
    '^.+\\.[jt]sx?$': '@swc/jest',
  },
  coveragePathIgnorePatterns: ['dist', 'lib', 'build-utils'],
};

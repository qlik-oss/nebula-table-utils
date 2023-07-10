module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: 'src/.+\\.(test|spec)\\.[jt]sx?$',
  coveragePathIgnorePatterns: ['dist', 'build-utils'],
};

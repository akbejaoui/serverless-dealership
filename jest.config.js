/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
  },
};
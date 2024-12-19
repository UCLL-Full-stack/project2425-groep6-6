const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', 
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@types/(.*)$': '<rootDir>/types/$1',
  },
  testEnvironment: 'jest-environment-jsdom', 
};

module.exports = createJestConfig(customJestConfig); 

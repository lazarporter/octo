import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  transformIgnorePatterns: ['/node_modules/'],
  // Add the following configurations
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;

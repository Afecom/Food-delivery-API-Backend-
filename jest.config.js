export default {
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    testMatch: [
    "**/tests/**/*.test.[jt]s",
    "**/?(*.)+(spec|test).[tj]s"
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
}
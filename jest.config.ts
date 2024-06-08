export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ['**/tests/**/*.spec.(j|t)s'],
    coveragePathIgnorePatterns: ['node_modules'],
    collectCoverage: true,
}
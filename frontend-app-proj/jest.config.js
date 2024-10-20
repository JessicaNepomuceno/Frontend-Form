/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
 },
 transformIgnorePatterns: ["node_modules/(?!(module))"],
//  ['node_modules/(?!(@testing-library)/)'],
};
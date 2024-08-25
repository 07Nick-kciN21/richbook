/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$"
};
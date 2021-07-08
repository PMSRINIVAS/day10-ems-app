import { sum } from "./calculator";

test("My First Unit Test 4 calculator", () => {
  const output = sum(10, 10);
  expect(output).toBe(20);
});

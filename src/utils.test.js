import { mockPromise, recursivePromise } from "./index";

describe("recursivePromises scenarios", () => {
  test("should return array of results", async () => {
    const input = [
      mockPromise(1),
      mockPromise(2),
      mockPromise(3),
      mockPromise(4)
    ];
    const output = [1, 2, 3, 4];

    expect.assertions(1);
    await expect(recursivePromise(input)).resolves.toEqual(output);
  });

  test("on error should return prev results and error", async () => {
    const brokenInput = [
      mockPromise(1),
      mockPromise(2),
      mockPromise(3, true),
      mockPromise(4)
    ];

    const output = [1, 2, "promise error"];

    // ASYNC TESTING PATTERNS
    // handy in async code - make sure you made at least one assertion
    expect.assertions(1);

    // 1. jest's 'done' callback
    // recursivePromise(brokenInput).catch(result => {
    //   console.log(result);
    //   expect(result).toEqual(output);
    //   done()
    // });

    // 2. RETURN a promise
    // return expect(recursivePromise(brokenInput)).rejects.toEqual(output)

    // 3. Async / await
    await expect(recursivePromise(brokenInput)).rejects.toEqual(output)

  });

  test("without arg should throw", () => {
    return expect(() => recursivePromise()).toThrow();
  });

  test("should be called one after another", () => {}); // how to test it ?
});

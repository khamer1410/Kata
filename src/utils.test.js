import { mockPromise, recursivePromise } from "./index";

describe("recursivePromises scenarios", () => {
  test("should return array of results", () => {
    const input = [
      mockPromise(1)
      // mockPromise(2),
      // mockPromise(3),
      // mockPromise(4)
    ];
    const output = [1, 2, 3, 4];
    // expect(user.getUserName(5)).resolves.toEqual('Paul');
    // expect(recursivePromise(input)).resolves.toEqual(output);

    // const result = await recursivePromise(input);
    // // console.log(result);
    recursivePromise(input).then(res => {
      console.log(res);
      expect(res).toEqual(output);
    });
  });

  test("on error should return prev results and error", async () => {
    const brokenInput = [
      mockPromise(1),
      mockPromise(2),
      mockPromise(3, true),
      mockPromise(4),
      mockPromise(4),
      mockPromise(4),
      mockPromise(4)
    ];

    const output = [1, 2, "promise error"];

    const result = await recursivePromise(brokenInput);
    expect(result).toEqual(output);
  });

  test("without arg should throw", () => {
    expect(() => recursivePromise()).toThrow();
  });

  test("should be called one after another", () => {}); // how to test it ?
});

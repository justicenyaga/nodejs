const lib = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if the input is not a number", () => {
    const args = [undefined, null, "string", true, {}];
    args.forEach((a) => {
      expect(() => {
        lib.fizzBuzz(a);
      }).toThrow();
    });
  });

  it("should return FizzBuzz if the input is divisible by both 3 and 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if the input is only divisible by 3", () => {
    const result = lib.fizzBuzz(6);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if the input is only divisible by 5", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return the input if the input is not divisible by 3 or 5", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});

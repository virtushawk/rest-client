const { expect } = require("@jest/globals");
const jsPracticalTask = require("../../js/js_practical_task");
const each = require("jest-each").default;

describe("secondsToDate: correct input", () => {
  each([
    [0, new Date(Date.UTC(2020, 6, 1, 0, 0, 0))],
    [31536000, new Date(Date.UTC(2021, 6, 1, 0, 0, 0))],
    [86400, new Date(Date.UTC(2020, 6, 2, 0, 0, 0))],
    [-86400, new Date(Date.UTC(2020, 5, 30, 0, 0, 0))],
  ]).it("Input is '%s' ", (seconds, expected) => {
    expect(jsPracticalTask.secondsToDate(seconds)).toStrictEqual(expected);
  });
});

describe("secondsToDate: awating exception", () => {
  each([[null]]).it("input is '%s'", (number) => {
    expect(() => jsPracticalTask.secondsToDate(number)).toThrow;
  });
});

describe("toBase2Converter: correct input", () => {
  each([
    [0, "0"],
    [1, "1"],
    [5, "101"],
    [10, "1010"],
  ]).it("Input is '%s' ", (number, expected) => {
    expect(jsPracticalTask.toBase2Converter(number)).toBe(expected);
  });
});

describe("toBase2Converter: awating exception", () => {
  each([[null]]).it("input is '%s'", (number) => {
    expect(() => jsPracticalTask.toBase2Converter(number)).toThrow;
  });
});

describe("substringOccurrencesCounter: correct input", () => {
  each([
    ["a", "test it", 0],
    ["t", "test it", 3],
    ["T", "test it", 3],
  ]).it("Input is '%s' '%s'", (substring, text, expected) => {
    expect(jsPracticalTask.substringOccurrencesCounter(substring, text)).toBe(
      expected
    );
  });
});

describe("subStringOccurrenceesCounter: awating exception", () => {
  each([
    ["", "test it"],
    ["t", ""],
    [null, "test it"],
    ["t", null],
  ]).it("input is '%s' '%s'", (substring, text) => {
    expect(() => jsPracticalTask.substringOccurrencesCounter(substring, text))
      .toThrow;
  });
});

describe("repeatingLitters: correct input", () => {
  each([
    ["Hello", "HHeelloo"],
    ["Hello world", "HHeello  wworrldd"],
    ["aa", "aa"],
  ]).it("Input is '%s'", (string, expected) => {
    expect(jsPracticalTask.repeatingLitters(string)).toBe(expected);
  });
});

describe("repeatingLitters: awating exception", () => {
  each([[""], [null]]).it("input is '%s'", (string) => {
    expect(() => jsPracticalTask.repeatingLitters(string)).toThrow;
  });
});

test("redundant: return type is function", () => {
  expect(jsPracticalTask.redundant("test")).toBeInstanceOf(Function);
});

describe("redundant: correct input", () => {
  each([["Hello"], ["hi"], ["Apple"]]).it("input is '%s'", (string) => {
    expect(jsPracticalTask.redundant(string)()).toBe(string);
  });
});

describe("redundant: awating exception", () => {
  each([[null], [""]]).it("input is '%s' ", (string) => {
    expect(() => jsPracticalTask.redundant(string)()).toThrow;
  });
});

describe("towerHanoi: correct input", () => {
  each([
    [0, 0],
    [1, 1],
    [2, 3],
    [10, 1023],
  ]).it("Input is '%s'", (number, expected) => {
    expect(jsPracticalTask.towerHanoi(number)).toBe(expected);
  });
});

describe("towerHanoi: awating exception", () => {
  each([[null], [-1]]).it("input is '%s' ", (number) => {
    expect(() => jsPracticalTask.towerHanoi(number)()).toThrow;
  });
});

describe("matrixMultiplication: correct input", () => {
  each([
    [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [1, 2],
        [3, 4],
      ],
      [
        [7, 10],
        [15, 22],
      ],
    ],
    [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [2, 2],
        [2, 2],
      ],
    ],
  ]).it("Input is '%s' '%s' ", (matrix1, matrix2, expected) => {
    expect(
      jsPracticalTask.matrixMultiplication(matrix1, matrix2)
    ).toStrictEqual(expected);
  });
});

describe("matrixMultiplication: awating exception", () => {
  each([
    [[null], [-1]],
    [[-1], [null]],
  ]).it("input is '%s' '%s' ", (matrix1, matrix2) => {
    expect(() => jsPracticalTask.matrixMultiplication(matrix1, matrix2))
      .toThrow;
  });
});

describe("gather: correct input", () => {
  each([
    [["a", "b", "c"], [0, 1, 2], "abc"],
    [["a", "b", "c"], [2, 1, 0], "cba"],
  ]).it("input is '%s'", (strArray, orderArray, expected) => {
    expect(
      jsPracticalTask
        .gather(strArray[0])(strArray[1])(strArray[2])
        .order(orderArray[0])(orderArray[1])(orderArray[2])
        .get()
    ).toBe(expected);
  });
});

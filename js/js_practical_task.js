"use strict";

module.exports = {
  secondsToDate: secondsToDate,
  toBase2Converter: toBase2Converter,
  substringOccurrencesCounter: substringOccurrencesCounter,
  repeatingLitters: repeatingLitters,
  redundant: redundant,
  towerHanoi: towerHanoi,
  matrixMultiplication: matrixMultiplication,
  gather: gather,
};

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
  if (seconds === null) {
    throw "Invalid argument: " + seconds;
  }
  let startDate = new Date(Date.UTC(2020, 6, 1, 0, 0, 0));
  startDate.setSeconds(seconds);
  return startDate;
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
  if (decimal === null) {
    throw "Invalid argument: " + decimal;
  }
  return (decimal >>> 0).toString(2);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
  if (!substring || !text || substring.length === 0 || text.length === 0) {
    throw "Invalid argument: " + substring + "or" + text;
  }
  substring = substring.toLowerCase();
  text = text.toLowerCase();
  return text.split(substring).length - 1;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
  if (!string || string.length === 0) {
    throw "Invalid argument: " + string;
  }
  let stringArray = string.split("");
  let repeatedString = "";
  stringArray.forEach((element) => {
    if (stringArray.filter((x) => x === element).length < 2) {
      element = element + element;
    }
    repeatedString = repeatedString + element;
  });
  return repeatedString;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
  if (!str || str.length === 0) {
    throw "Invalid argument: " + str;
  }
  return function f1() {
    return str;
  };
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
  if (disks === null || disks < 0) {
    throw "Invalid argument: " + disks;
  }
  return 2 ** disks - 1;
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
  if (matrix1 === null || matrix2 === null) {
    throw "Invalid argument: " + matrix1 + "or" + matrix2;
  }
  var aNumRows = matrix1.length,
    aNumCols = matrix1[0].length,
    bNumRows = matrix2.length,
    bNumCols = matrix2[0].length,
    m = new Array(aNumRows);
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols);
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += matrix1[r][i] * matrix2[i][c];
      }
    }
  }
  return m;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
  let inputArray = [];
  let outputArray;
  inputArray.push(str);
  return function f2(str) {
    inputArray.push(str);
    let count = 0;
    function order(num) {
      if (count === 0) {
        outputArray = new Array(inputArray.length);
      }
      outputArray[num] = inputArray.shift();
      count++;
      function get() {
        return outputArray.join("");
      }
      order.get = get;
      return order;
    }
    f2.order = order;
    return f2;
  };
}

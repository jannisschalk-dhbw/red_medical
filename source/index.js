"use strict";
const path = require('path');
const fs = require("fs");
const clearSmallerTxtPath = process.env.PWD + path.sep + "clear_smaller.txt";
const readAsString = (path) => {
    return fs.readFileSync(path).toString();
};
const sumAllNumbersInText = (text) => {
    let sum = 0;
    [...text].forEach(element => {
        let number = parseInt(element);
        if (!isNaN(number)) {
            sum += number;
        }
    });
    return sum;
};
const addVocalValenceToSum = (sum, text) => {
    [...text].forEach(element => {
        switch (element) {
            case "a":
                sum += 2;
            case "e":
                sum += 4;
            case "i":
                sum += 8;
            case "o":
                sum += 16;
            case "u":
                sum += 32;
        }
    });
    return sum;
};
const findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex = (text) => {
    let numbers = sumOfEachSentence(text);
    let threeBiggestValues = distinctSortAndReturnThreeBiggestValues(numbers);
    let sortedByOccurrences = sortThreeBiggestValuesByOccurrences(numbers, threeBiggestValues);
    return subtractIndexFromNumberInArray(sortedByOccurrences);
};
const sumOfEachSentence = (text) => {
    let sentences = text.split(".");
    let numbers = [];
    sentences.forEach(element => {
        let sumOfSentence = sumAllNumbersInText(element);
        numbers.push(sumOfSentence);
    });
    return numbers;
};
const distinctSortAndReturnThreeBiggestValues = (numbers) => {
    const unique = new Set(numbers);
    const sorted = [...unique].sort((a, b) => a - b);
    return sorted.slice(-3);
};
const sortThreeBiggestValuesByOccurrences = (numbers, threeBiggest) => {
    var result = new Map();
    threeBiggest.forEach(element => {
        result.set(element, numbers.filter(number => number === element).length);
    });
    var sortedByOccurrence = new Map([...result.entries()].sort((a, b) => b[1] - a[1])).keys();
    return [...sortedByOccurrence];
};
const subtractIndexFromNumberInArray = (numbers) => {
    return numbers.map((value, index) => value - index);
};
const convertIntToCharByAscii = (numbers) => {
    let chars = numbers.map(value => String.fromCharCode(value));
    return chars.join("");
};
const text = readAsString(clearSmallerTxtPath);
let sumOfAllNumbers = sumAllNumbersInText(text);
let vocalValence = addVocalValenceToSum(sumOfAllNumbers, text);
let biggestSumsInSentence = findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex(text);
let asciiConverterResult = convertIntToCharByAscii(biggestSumsInSentence);
console.log("--Task 2--");
console.log("Description: Sum of all number in text");
console.log("Result: " + sumOfAllNumbers);
console.log("---------------------------------------------------------\n");
console.log("--Task 3--");
console.log(`Description: Added Vocal Valence [a=2, e=4, i=8, o=16, u=32] to Sum [${sumOfAllNumbers}] of all number in text`);
console.log("Result: " + vocalValence);
console.log("---------------------------------------------------------\n");
console.log("--Task 4--");
console.log("a)");
console.log("Result: " + biggestSumsInSentence);
console.log("b)");
console.log("Result:" + asciiConverterResult);

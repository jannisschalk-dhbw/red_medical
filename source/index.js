"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const FileDecrypter_1 = require("./crypto/FileDecrypter");
const TextProcessor_1 = require("./util/TextProcessor");
const decrypter = new FileDecrypter_1.default();
decrypter.doDecrypt();
//TODO: use output of decrypter
const clearSmallerTxtPath = process.env.PWD + path.sep + "clear_smaller.txt";
const readAsString = (path) => {
    return fs.readFileSync(path).toString();
};
const text = readAsString(clearSmallerTxtPath);
let textProcessor = new TextProcessor_1.default(text);
let sumOfAllNumbers = textProcessor.sumAllNumbersInText(text);
let vocalValence = textProcessor.addVocalValenceToSum(sumOfAllNumbers, text);
let biggestSumsInSentence = textProcessor.findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex(text);
let asciiConverterResult = textProcessor.convertIntToCharByAscii(biggestSumsInSentence);
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

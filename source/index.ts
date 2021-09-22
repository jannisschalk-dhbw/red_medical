import * as path from 'path'
import * as fs from "fs"
import FileDecrypter from "./crypto/FileDecrypter"
import TextProcessor from "./util/TextProcessor";

const decrypter = new FileDecrypter()
decrypter.doDecrypt();

//TODO: use output of decrypter
const clearSmallerTxtPath: string = process.env.PWD + path.sep + "clear_smaller.txt"

const readAsString = (path): string => {
    return fs.readFileSync(path).toString();
}

const text: string = readAsString(clearSmallerTxtPath)

let textProcessor = new TextProcessor(text);
let sumOfAllNumbers: number = textProcessor.sumAllNumbersInText(text)
let vocalValence: number = textProcessor.addVocalValenceToSum(sumOfAllNumbers, text)
let biggestSumsInSentence = textProcessor.findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex(text);
let asciiConverterResult = textProcessor.convertIntToCharByAscii(biggestSumsInSentence);


console.log("--Task 2--")
console.log("Description: Sum of all number in text")
console.log("Result: " + sumOfAllNumbers)
console.log("---------------------------------------------------------\n")

console.log("--Task 3--")
console.log(`Description: Added Vocal Valence [a=2, e=4, i=8, o=16, u=32] to Sum [${sumOfAllNumbers}] of all number in text`)
console.log("Result: " + vocalValence)
console.log("---------------------------------------------------------\n")

console.log("--Task 4--");
console.log("a)");
console.log("Result: " + biggestSumsInSentence);
console.log("b)");
console.log("Result:" + asciiConverterResult);








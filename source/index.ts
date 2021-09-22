const path = require('path')
const fs = require("fs")

const clearSmallerTxtPath: string = process.env.PWD + path.sep + "clear_smaller.txt"

const readAsString = (path): string => {
    return fs.readFileSync(path).toString();
}

const sumAllNumbersInText = (text: string): number => {
    let sum: number = 0;
    [...text].forEach(element => {
        let number = parseInt(element);
        if (!isNaN(number)) {
            sum += number;
        }
    })
    return sum;
}

const addVocalValenceToSum = (sum: number, text: string): number => {
    [...text].forEach(element => {
        switch (element) {
            case "a":
                sum += 2
            case "e":
                sum += 4
            case "i":
                sum += 8
            case "o":
                sum += 16
            case "u":
                sum += 32
        }
    })

    return sum;
}


const findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex = (text: string): number[] => {
    let numbers = sumOfEachSentence(text);
    let threeBiggestValues = distinctSortAndReturnThreeBiggestValues(numbers);
    let sortedByOccurrences = sortThreeBiggestValuesByOccurrences(numbers, threeBiggestValues);
    return subtractIndexFromNumberInArray(sortedByOccurrences);
}

const sumOfEachSentence = (text: string): number[] => {
    let sentences: string[] = text.split(".");
    let numbers: number[] = []

    sentences.forEach(element => {
        let sumOfSentence = sumAllNumbersInText(element);
        numbers.push(sumOfSentence);
    })

    return numbers;
}

const distinctSortAndReturnThreeBiggestValues = (numbers: number[]) => {
    const unique = new Set<number>(numbers);
    const sorted = [...unique].sort((a, b) => a - b);
    return sorted.slice(-3);
}

const sortThreeBiggestValuesByOccurrences = (numbers: number[], threeBiggest: number[]): number[] => {
    var result = new Map<number, number>();
    
    threeBiggest.forEach(element => {
        result.set(element, numbers.filter(number => number === element).length)
    })
    var sortedByOccurrence = new Map([...result.entries()].sort((a, b) => b[1] - a[1])).keys()
    return [...sortedByOccurrence]
}

const subtractIndexFromNumberInArray = (numbers: number[]): number[] => {
    return numbers.map((value, index) => value - index)
}

const convertIntToCharByAscii = (numbers: number[]): string => {
    let chars: string[] = numbers.map(value => String.fromCharCode(value))
    return chars.join("");
}
const text: string = readAsString(clearSmallerTxtPath)
let sumOfAllNumbers: number = sumAllNumbersInText(text)
let vocalValence: number = addVocalValenceToSum(sumOfAllNumbers, text)

let biggestSumsInSentence = findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex(text);
let asciiConverterResult = convertIntToCharByAscii(biggestSumsInSentence);
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








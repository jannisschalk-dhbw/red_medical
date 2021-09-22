"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextProcessor {
    constructor(text) {
        this.sumAllNumbersInText = (text) => {
            let sum = 0;
            [...text].forEach(element => {
                let number = parseInt(element);
                if (!isNaN(number)) {
                    sum += number;
                }
            });
            return sum;
        };
        this.addVocalValenceToSum = (sum, text) => {
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
        this.findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex = (text) => {
            let numbers = this.sumOfEachSentence(text);
            let threeBiggestValues = this.distinctSortAndReturnThreeBiggestValues(numbers);
            let sortedByOccurrences = this.sortThreeBiggestValuesByOccurrences(numbers, threeBiggestValues);
            return this.subtractIndexFromNumberInArray(sortedByOccurrences);
        };
        this.sumOfEachSentence = (text) => {
            let sentences = text.split(".");
            let numbers = [];
            sentences.forEach(element => {
                let sumOfSentence = this.sumAllNumbersInText(element);
                numbers.push(sumOfSentence);
            });
            return numbers;
        };
        this.distinctSortAndReturnThreeBiggestValues = (numbers) => {
            const unique = new Set(numbers);
            const sorted = [...unique].sort((a, b) => a - b);
            return sorted.slice(-3);
        };
        this.sortThreeBiggestValuesByOccurrences = (numbers, threeBiggest) => {
            var result = new Map();
            threeBiggest.forEach(element => {
                result.set(element, numbers.filter(number => number === element).length);
            });
            var sortedByOccurrence = new Map([...result.entries()].sort((a, b) => b[1] - a[1])).keys();
            return [...sortedByOccurrence];
        };
        this.subtractIndexFromNumberInArray = (numbers) => {
            return numbers.map((value, index) => value - index);
        };
        this.convertIntToCharByAscii = (numbers) => {
            let chars = numbers.map(value => String.fromCharCode(value));
            return chars.join("");
        };
        this.text = text;
    }
}
exports.default = TextProcessor;

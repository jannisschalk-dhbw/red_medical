interface TextProcessor {
    text: string; 
}

class TextProcessor implements TextProcessor {

    constructor(text) {
        this.text = text
    }

    sumAllNumbersInText = (text: string): number => {
        let sum: number = 0;
        [...text].forEach(element => {
            let number = parseInt(element);
            if (!isNaN(number)) {
                sum += number;
            }
        })
        return sum;
    }
    
    addVocalValenceToSum = (sum: number, text: string): number => {
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
    
    findThreeBiggestSumsOfSentencesInTextSortedByThierOccuenceAndSubtractedIndex = (text: string): number[] => {
        let numbers = this.sumOfEachSentence(text);
        let threeBiggestValues = this.distinctSortAndReturnThreeBiggestValues(numbers);
        let sortedByOccurrences = this.sortThreeBiggestValuesByOccurrences(numbers, threeBiggestValues);
        return this.subtractIndexFromNumberInArray(sortedByOccurrences);
    }
    
    sumOfEachSentence = (text: string): number[] => {
        let sentences: string[] = text.split(".");
        let numbers: number[] = []
    
        sentences.forEach(element => {
            let sumOfSentence = this.sumAllNumbersInText(element);
            numbers.push(sumOfSentence);
        })
    
        return numbers;
    }
    
    distinctSortAndReturnThreeBiggestValues = (numbers: number[]) => {
        const unique = new Set<number>(numbers);
        const sorted = [...unique].sort((a, b) => a - b);
        return sorted.slice(-3);
    }
    
    sortThreeBiggestValuesByOccurrences = (numbers: number[], threeBiggest: number[]): number[] => {
        var result = new Map<number, number>();
        
        threeBiggest.forEach(element => {
            result.set(element, numbers.filter(number => number === element).length)
        })
        var sortedByOccurrence = new Map([...result.entries()].sort((a, b) => b[1] - a[1])).keys()
        return [...sortedByOccurrence]
    }
    
    subtractIndexFromNumberInArray = (numbers: number[]): number[] => {
        return numbers.map((value, index) => value - index)
    }
    
    convertIntToCharByAscii = (numbers: number[]): string => {
        let chars: string[] = numbers.map(value => String.fromCharCode(value))
        return chars.join("");
    }
}

export default TextProcessor;
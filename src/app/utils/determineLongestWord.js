
export function determineLongestWord(previousLongest, submittedWord) {
 return (previousLongest.length >= submittedWord.length) ? previousLongest : submittedWord
}
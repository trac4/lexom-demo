//scoring based off frequency analysis in here: https://blogs.sas.com/content/iml/2014/09/19/frequency-of-letters.html
//file also includes rate score and the array of ratings

export function scorer(word, freq, syllables) {
  let score = 0;

  for (let letters of word) {
    switch (letters) {
      case "e":
        score += 1;
        break;
      case "t":
      case "a":
      case "o":
      case "i":
      case "n":
        score += 1.5;
        break;
      case "s":
      case "r":
      case "h":
      case "l":
        score += 1.75;
        break;
      case "d":
      case "c":
      case "u":
      case "m":
        score += 2;
        break;
      case "f":
      case "p":
      case "g":
      case "w":
      case "y":
        score += 2.5;
        break;
      case "b":
      case "v":
        score += 3;
        break;
      case "x":
      case "j":
        score += 4.5;
        break;
      case "q":
      case "z":
        score += 8;
        break;
    }
  }
  return Number((score * (10 - freq) * ( (10 + syllables) / 10 ) ** 2).toFixed(2));
}

export const rate = ['okay','not bad','Good','Great','Amazing!','Astonishing!']

export function rateScore(score) {
  if (score < 50)   return rate[0]
  if (score < 100)  return rate[1]
  if (score < 175)  return rate[2]
  if (score < 275)  return rate[3]
  if (score < 400)  return rate[4]
  if (score >= 400) return rate[5]
}
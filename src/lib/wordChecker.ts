export function checkWord(guess: string, referenceWord: string): string[] {
  const result = Array(guess.length).fill("bg-danger");
  const refChars = referenceWord.split("");
  const guessChars = guess.split("");
  const refUsed = Array(referenceWord.length).fill(false);

  // First pass: check for exact matches
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === refChars[i]) {
      result[i] = "bg-success";
      refUsed[i] = true;
    }
  }

  // Second pass: check for present letters (wrong position)
  for (let i = 0; i < guessChars.length; i++) {
    if (result[i] === "bg-success") continue;
    for (let j = 0; j < refChars.length; j++) {
      if (!refUsed[j] && guessChars[i] === refChars[j]) {
        result[i] = "bg-warning";
        refUsed[j] = true;
        break;
      }
    }
  }

  return result;
}
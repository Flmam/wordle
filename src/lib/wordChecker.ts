export function checkWord(characterValue: string, index: number, referenceWord: string): string {
  let chars = referenceWord.split("");
  console.log(referenceWord);
  if ((characterValue == chars[index])) {
    return "bg-success";
  } else if (chars.includes(characterValue)) {
    return "bg-warning";
  } else {
    return "bg-danger";
  }
}
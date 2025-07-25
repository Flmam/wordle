export function checkWord(characterValue: string, index: number, referenceWord: string): string {
  if (!characterValue) return "";
  
  let chars = referenceWord.split("");
  
  // Exact match - right letter, right position
  if (characterValue === chars[index]) {
    return "bg-success";
  }
  
  // Check if letter exists but wrong position
  // Count occurrences of the character in reference word
  let refCount = chars.filter(c => c === characterValue).length;
  
  // Count how many exact matches of this character exist
  let exactMatches = chars.filter((c, i) => c === characterValue && characterValue === chars[i]).length;
  
  // If we still have remaining occurrences after exact matches
   if (refCount > exactMatches || chars.includes(characterValue)) {
    return "bg-warning";
  }
  
  return "bg-danger";
}
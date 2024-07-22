export interface  IGuessedWord{
    letters: IGuessedLetter[]
}

export interface IGuessedLetter 
{
    letter: string,
    bgClass: string
}
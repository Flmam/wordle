<script lang="ts">
  import WordleRow from "./lib/WordleRow.svelte";
  import { checkWord } from "./lib/wordChecker";
  import { words } from "./lib/words";
  import GuessedWord from "./lib/GuessedWord.svelte";
  import type { IGuessedWord } from "./lib/interfaces";
  import { onMount } from "svelte";
  import {
    checkValuesLocalStorage,
    HighScore,
    WinStreak,
    handleLoss,
    handleWin,
  } from "./lib/highscoreHandler";
  import NavBar from "./lib/NavBar.svelte";

  let hasWon = false;
  let hasLost = false;
  let wordIncorrect = false;
  let random = Math.random();

  let language = "englisch";
  let referenceWord = "";
  let collection = words.englisch;

  $: {
    if (language == "deutsch") {
      collection = words.deutsch;
    }
    let randomIndex = Math.floor(random * collection.length);
    referenceWord = collection[randomIndex];
  }

  let firstValue: string;
  let secondValue: string;
  let thirdValue: string;
  let fourthValue: string;
  let fifthValue: string;

  $: fullWord =
    firstValue + secondValue + thirdValue + fourthValue + fifthValue;

  let guesses: IGuessedWord[] = [];

  $: fistClassToSet = checkWord(firstValue, 0, referenceWord);
  $: secondClassToSet = checkWord(secondValue, 1, referenceWord);
  $: thirdClassToSet = checkWord(thirdValue, 2, referenceWord);
  $: fourthClassToSet = checkWord(fourthValue, 3, referenceWord);
  $: fifthClassToSet = checkWord(fifthValue, 4, referenceWord);

  function playRound() {
    if (hasWon || hasLost) {
      return;
    }

    if (!collection.includes(fullWord)) {
      wordIncorrect = true;
      return;
    } else {
      wordIncorrect = false;
    }

    addGuess();

    if (
      fistClassToSet == "bg-success" &&
      secondClassToSet == "bg-success" &&
      thirdClassToSet == "bg-success" &&
      fourthClassToSet == "bg-success" &&
      fifthClassToSet == "bg-success"
    ) {
      hasWon = true;
    }

    if (!hasWon && guesses.length >= 5) {
      hasLost = true;
    }

    if (hasWon) {
      handleWin();
    }
    if (hasLost) {
      handleLoss();
    }

    clearInput();
  }

  function addGuess() {
    const newGuess: IGuessedWord = {
      letters: [
        {
          letter: firstValue,
          bgClass: fistClassToSet,
        },
        {
          letter: secondValue,
          bgClass: secondClassToSet,
        },
        {
          letter: thirdValue,
          bgClass: thirdClassToSet,
        },
        {
          letter: fourthValue,
          bgClass: fourthClassToSet,
        },
        {
          letter: fifthValue,
          bgClass: fifthClassToSet,
        },
      ],
    };
    guesses = guesses.concat([newGuess]);
  }

  function clearInput() {
    firstValue = "";
    secondValue = "";
    thirdValue = "";
    fourthValue = "";
    fifthValue = "";
  }

  function onKeyDown(e: any) {
    if (e.keyCode == 13) {
      playRound();
    }
  }

  onMount(() => {
    let storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      language = storedLanguage;
    }

    checkValuesLocalStorage();
  });
</script>

<div class="h-100 d-flex flex-column">
  <NavBar bind:language></NavBar>
  <main
    class="d-flex flex-column flex-grow-1 m-auto w-75 align-items-center justify-content-center gap-3"
  >
    <div class="d-flex flex-row gap-5 bg-success rounded py-2 px-4">
      <div class="fs-5 fw-bold">Highscore: {$HighScore}</div>
      <div class="fs-5 fw-bold">Win Streak: {$WinStreak}</div>
    </div>
    {#each guesses as guess}
      <GuessedWord {guess}></GuessedWord>
    {/each}

    {#if !hasWon && !hasLost}
      <div class="d-flex gap-2">
        <WordleRow bind:wordValue={firstValue} indexInput={0}></WordleRow>
        <WordleRow bind:wordValue={secondValue} indexInput={1}></WordleRow>
        <WordleRow bind:wordValue={thirdValue} indexInput={2}></WordleRow>
        <WordleRow bind:wordValue={fourthValue} indexInput={3}></WordleRow>
        <WordleRow bind:wordValue={fifthValue} indexInput={4}></WordleRow>
      </div>
    {/if}

    {#if hasWon}
      <div class="fs-5 fw-bold">Alles richtig !</div>
      <a class="btn btn-primary" href="index.html">New</a>
    {:else if wordIncorrect}
      <div class="alert alert-danger fs-5 fw-bold" role="alert">
        Wort nicht in der Wortliste
      </div>
    {:else if hasLost}
      <div class="fs-5 fw-bold">Verloren!</div>
      <div class="fs-6">Lösungswort: {referenceWord}</div>
      <a class="btn btn-primary" href="index.html">New</a>
    {/if}
  </main>
</div>
<svelte:window on:keydown={onKeyDown} />

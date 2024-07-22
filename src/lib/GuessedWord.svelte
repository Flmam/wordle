<script lang="ts">
  import GuessedLetter from "./GuessedLetter.svelte";
  import type { IGuessedWord } from "./interfaces";
  export let guess: IGuessedWord;
</script>

<div class="d-flex gap-2">
  {#each guess.letters as guessedLetter}
    <GuessedLetter
      wordValue={guessedLetter.letter}
      bgClass={guessedLetter.bgClass}
    ></GuessedLetter>
  {/each}
</div>

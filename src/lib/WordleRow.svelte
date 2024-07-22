<script lang="ts">
  const regex = new RegExp("^[a-zA-Z]$");

  export let wordValue: string;
  $: wordValue = regex.test(wordValue) ? wordValue : "";
  export let indexInput: number;
  let id = "inputField" + indexInput;

  function focusNextElement(e: any) {
    if (e.keyCode == 8) {
      document.getElementById("inputField" + (indexInput - 1))?.focus();
    } else {
      document.getElementById("inputField" + (indexInput + 1))?.focus();
    }
  }
</script>

<input
  bind:value={wordValue}
  {id}
  class="text-center fw-bold text-uppercase form-control border-black border-2 inputSquares fs-4"
  maxlength="1"
  type="text"
  autocomplete="off"
  on:keyup={focusNextElement}
/>

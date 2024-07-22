<script lang="ts">
  export let language: string;
  function setLanguage() {
    localStorage.setItem("language", language);
  }
</script>

<div
  class="d-flex flex-row w-100 align-items-center justify-content-between heightNavBar bg-success px-4"
>
  <div class="fs-2 fw-bold">Wordle</div>
  <div>
    <select class="form-select" bind:value={language} on:change={setLanguage}>
      <option value="englisch">English</option>
      <option value="deutsch">German</option>
    </select>
  </div>
</div>

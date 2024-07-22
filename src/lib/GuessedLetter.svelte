<script lang="ts">
  export let wordValue: string;
  export let bgClass: String;
</script>

<div
  class="{bgClass} rounded d-flex align-items-center justify-content-center fw-bold text-uppercase border-black border-2 inputSquares fs-4"
>
  {wordValue}
</div>

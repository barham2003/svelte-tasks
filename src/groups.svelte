<script lang="ts">
  import { activeGroup } from "./stores";
  export let groups: string[];
</script>

<ul>
  {#each groups as group}
    <button on:click={() => ($activeGroup = group)}>{group}</button>
  {/each}
</ul>

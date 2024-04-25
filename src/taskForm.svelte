<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();
  let title: string = "";
  let state: string = "";
  let group: string = "";
  let body: string = "";

  $: task = { title, state, group, body };

  function onSubmit() {
    dispatch("submit", { task });
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input bind:value={title} placeholder="title" />
  <input bind:value={body} placeholder="body" />
  <input bind:value={state} placeholder="state" />
  <input bind:value={group} placeholder="group" />
  <button>Submit</button>
</form>

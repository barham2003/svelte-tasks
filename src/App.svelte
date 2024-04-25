<script lang="ts">
  import TaskManager from "./TaskManager.svelte";
  import Loginpage from "./login-page.svelte";
  import { token } from "./stores";
  console.log("HERE", token);
</script>

{#if $token}
  <TaskManager />
{:else}
  <Loginpage />
{/if}

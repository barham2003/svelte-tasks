<script lang="ts">
  import { login } from "./actions";
  import { token } from "./stores";

  let username: string;
  let password: string;

  $: message = "";
  async function handleSubmit() {
    const json = await login(username, password);
    if (json.status === "error") {
      message = json.message;
      return;
    }
    console.log(json.token);
    localStorage.setItem("token", json.token);
    $token = json.token;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <span>{message}</span>

  <br />
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="password" />
  <button>Submit</button>

  <span>{$token}</span>
</form>

<script lang="ts">
  import { onMount } from "svelte";
  import { deleteTask, getData, postTask } from "./actions";
  import type { Task } from "./types";
  import TaskForm from "./taskForm.svelte";
  import Groups from "./groups.svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { activeGroup, token } from "./stores";

  let tasks: Task[] = [];
  let errorMessage = "";

  onMount(async () => (tasks = await getData($token)));

  async function addTask(
    event: CustomEvent<{
      task: Task;
    }>
  ) {
    const res = await postTask(event.detail.task, $token);
    if (res.status === "error") {
      errorMessage = res.message;
      return;
    }

    errorMessage = "";

    tasks = [...tasks, res.data];
  }

  async function deleteTaskHandler(taskId: string) {
    const res = await deleteTask(taskId, $token);
    if (res.status === "error") {
      errorMessage = res.message;
      return;
    }

    errorMessage = "";
    tasks = await getData($token);
  }

  $: groups = [...new Set(tasks.map((task) => task.group)), "main"];
</script>

<main transition:fade>
  <Groups {groups} />

  <TaskForm on:submit={addTask} />
  <span>{errorMessage}</span>

  <ul>
    {#each tasks.filter((item) => $activeGroup === "main" || item.group === $activeGroup) as task (task.id)}
      <li transition:fade animate:flip>
        {task.title}, type is {task.state} also {task.group}
        {task.id}
        <button on:click={() => deleteTaskHandler(task.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</main>

import { writable } from "svelte/store";

export const activeGroup = writable("main");


export const token = writable(localStorage.getItem("token") || "")
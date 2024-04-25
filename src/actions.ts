import { token } from "./stores";
import type { Task } from "./types";
const API = "https://task-api-zdam.onrender.com";

export async function getData(token: string) {
    const request = await fetch(`${API}/tasks`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const json = await request.json();
    console.log(json);

    return json.data;
}

export async function login(username: string, password: string) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    return json;
}

export async function postTask(task: Task, token: string) {
    const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    const json = await res.json();
    console.log(json);

    return json;
}

export async function deleteTask(taskId: string, token: string) {
    const res = await fetch(`${API}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await res.json();
    return json;
}

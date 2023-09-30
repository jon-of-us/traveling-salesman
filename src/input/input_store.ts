import { writable } from "svelte/store";

export const input_store = writable({
    slider1: 0,
    slider2: 0,
});

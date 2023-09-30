import { writable } from "svelte/store";

export const input_store = writable({
    nPoints: 0,
});

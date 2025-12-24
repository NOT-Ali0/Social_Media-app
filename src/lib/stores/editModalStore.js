import { writable } from 'svelte/store';

function createEditModalStore() {
    const { subscribe, set, update } = writable({
        isOpen: false,
        post: null
    });

    return {
        subscribe,
        open: (post) => set({ isOpen: true, post }),
        close: () => set({ isOpen: false, post: null })
    };
}

export const editModalStore = createEditModalStore();

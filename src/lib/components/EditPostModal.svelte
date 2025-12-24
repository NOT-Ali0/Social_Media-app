<script>
    import { editModalStore } from "../stores/editModalStore";
    import { fade, scale } from "svelte/transition";
    import Button from "./Button.svelte";
    import { BodystateValue } from "../stores/BodyStateValue";
    import axios from "axios";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const handleReload = () => {
        dispatch("reload");
    };

    let isOpen = $state(false);
    let post = null;
    let body = $state("");
    

    function handleBodyvalue(e) {
        body = e.target.value;
        BodystateValue.update((state) => ({ ...state, BodyValue: body }));
    }

    function handleEditPost() {
        axios
            .put(
                `https://tarmeezacademy.com/api/v1/posts/${$BodystateValue.id}`,
                {
                    body: $BodystateValue.BodyValue,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${$BodystateValue.token}`,
                    },
                },
            )
            .then((res) => console.log(res))
            .then(() => handleReload())
            .then(() => editModalStore.close())
            .catch((err) => console.log(err));
            
    }

    editModalStore.subscribe((state) => {
        isOpen = state.isOpen;
        post = state.post;
        if (post) {
            body = post.body || "";
        }
    });
    function handleClose() {
        editModalStore.close();
    }

    
</script>

{#if isOpen}
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        on:click|self={handleClose}
        role="presentation"
    >
        <div
            class="modal-container"
            transition:scale={{ duration: 200, start: 0.95 }}
        >
            <div class="modal-header">
                <h3>Edit Post</h3>
                <button
                    class="close-btn"
                    on:click={handleClose}
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div class="modal-body">
                <div class="input-group">
                    <label for="edit-title">Title</label>
                    <input
                        type="text"
                        id="edit-title"
                        bind:value={body}
                        placeholder="Post Title"
                        on:change={(e) => handleBodyvalue(e)}
                    />
                </div>
                <!-- <div class="input-group">
                    <label for="edit-body">Content</label>
                    <textarea
                        id="edit-body"
                        bind:value={body}
                        rows="5"
                        placeholder="What's on your mind?"
                    ></textarea>
                </div> -->
            </div>

            <div class="modal-footer">
                <Button variant="secondary" on:click={handleClose}
                    >Cancel</Button
                >
                <Button on:click={() => handleEditPost()}>Save Changes</Button>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-md);
    }

    .modal-container {
        background: var(--card-bg, white);
        width: 100%;
        max-width: 500px;
        border-radius: var(--radius-lg, 12px);
        display: flex;
        flex-direction: column;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        position: relative;
        overflow: hidden;
    }

    .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid var(--divider-color, #eee);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary, #111);
        margin: 0;
    }

    .close-btn {
        padding: 8px;
        border-radius: 50%;
        background: transparent;
        color: var(--text-secondary, #666);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .close-btn:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: var(--text-primary, #000);
    }

    .modal-body {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .input-group label {
        font-weight: 600;
        color: var(--text-primary, #333);
        font-size: 0.9rem;
    }

    .input-group input,
    .input-group textarea {
        padding: 12px;
        border-radius: var(--radius-sm, 8px);
        border: 1px solid var(--divider-color, #ddd);
        background: var(--bg-color, #f9f9f9);
        color: var(--text-primary, #111);
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.2s ease;
        outline: none;
        width: 100%;
        box-sizing: border-box;
    }

    .input-group input:focus,
    .input-group textarea:focus {
        border-color: var(--primary-color, #1877f2);
        background: white;
        box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.1);
    }

    .input-group textarea {
        resize: vertical;
        min-height: 120px;
    }

    .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid var(--divider-color, #eee);
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        background-color: var(--bg-color, #f9f9f9);
    }

    @media (max-width: 600px) {
        .modal-container {
            width: 100%;
            height: auto;
            max-height: 90vh;
            border-radius: 12px;
        }
    }
</style>

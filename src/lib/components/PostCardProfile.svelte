<script>
    export let post;
    import { modalStore } from "../stores/modalStore";
    import { editModalStore } from "../stores/editModalStore";
    import { handleComment } from "./CommentFunc.svelte.js";
    import { slide } from "svelte/transition";
    import { BodystateValue } from "../stores/BodyStateValue";
    import axios from "axios";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const handleReload = () => {
        dispatch("reload");
    };

    let showMenu = false;
    function toggleMenu() {
        showMenu = !showMenu;
    }

    function handleEdit(id) {
        BodystateValue.update((state) => ({
            ...state,
            id: id,
            token: localStorage.getItem("token"),
        }));
        editModalStore.open(post);
        showMenu = false;
    }

    function handleDelete() {
        confirm("Are you sure you want to delete this post?");

        axios
            .delete(`https://tarmeezacademy.com/api/v1/posts/${post.id}`, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                handleReload();
            })
            .catch((err) => {
                console.log(err);
            });

        showMenu = false;
    }
</script>

<svelte:window
    on:click={(e) => {
        if (
            showMenu &&
            e.target instanceof Element &&
            !e.target.closest(".menu-container")
        ) {
            showMenu = false;
        }
    }}
/>

<div class="post-card">
    <div class="post-header">
        <div class="avatar">
            <img src="profilePic.png" alt="" />
        </div>
        <div class="user-info">
            <div class="name">{post.author?.name}</div>
            <div class="time">{post.created_at}</div>
        </div>
        <div class="menu-container">
            <button class="edit-btn" on:click|stopPropagation={toggleMenu}>
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
                    class="lucide lucide-ellipsis-icon lucide-ellipsis"
                    ><circle cx="12" cy="12" r="1" /><circle
                        cx="19"
                        cy="12"
                        r="1"
                    /><circle cx="5" cy="12" r="1" /></svg
                >
            </button>

            {#if showMenu}
                <div class="dropdown-menu" transition:slide={{ duration: 150 }}>
                    <button
                        class="menu-item"
                        on:click={() => handleEdit(post.id)}
                    >
                        <span class="menu-icon">✏️</span> Edit
                    </button>
                    <button class="menu-item delete" on:click={handleDelete}>
                        <span class="menu-icon">🗑️</span> Delete
                    </button>
                </div>
            {/if}
        </div>
    </div>

    <div class="post-content">
        <p>{post.title}</p>
        <p>{post.body}</p>
        {#if post.image}
            <div class="post-image">
                <img src={post.image} alt="Post content" />
            </div>
        {/if}
    </div>

    {#if post.tags}
        {#each post.tags as tag}
            <div class="tags-cont">
                {post.tags}
            </div>
        {/each}
    {/if}
    <div class="post-stats">
        <div class="stat-left">
            <span>0 👍 </span>
        </div>
        <div class="stat-right">
            <span>{post.comments_count} Comments</span>
            <span>0 Shares</span>
        </div>
    </div>

    <div class="post-actions">
        <button class="action-btn">
            <span class="icon">👍</span> Like
        </button>
        <div on:click={() => modalStore.open(post)}>
            <button class="action-btn" on:click={() => handleComment(post.id)}>
                <span class="icon">💬</span> Comment
            </button>
        </div>
        <button class="action-btn">
            <span class="icon">↗️</span> Share
        </button>
    </div>
</div>

<style>
    .menu-container {
        position: relative;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--card-bg, white);
        border-radius: var(--radius-md, 8px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 8px;
        min-width: 150px;
        z-index: 10;
        overflow: hidden;
        border: 1px solid var(--divider-color, #eee);
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--text-primary, #333);
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .menu-item:hover {
        background: var(--bg-color, #f5f5f5);
    }

    .menu-item.delete {
        color: #e41e3f;
    }

    .menu-item.delete:hover {
        background: #fff0f2;
    }

    .menu-icon {
        font-size: 1.1em;
    }

    .edit-btn {
        color: var(--text-primary, #333);
        font-weight: 600;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        transition: background 0.2s;
    }

    .edit-btn:hover {
        background: var(--bg-color, #f5f5f5);
    }

    .tags-cont {
        display: flex;
        width: auto;
        max-width: 100%;
        border-radius: 20px;
        flex-direction: row;
        padding: 4px 12px;
        background-color: var(--bg-color, #eee);
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        gap: 5px;
        display: inline-flex;
        margin-right: 8px;
    }

    .post-card {
        background: var(--card-bg, white);
        border-radius: var(--radius-md, 8px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md, 16px);
        width: 100%;
        position: relative;
    }

    .post-header {
        padding: var(--spacing-md, 16px);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm, 12px);
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .user-info {
        flex: 1;
    }

    .name {
        font-weight: 600;
        color: var(--text-primary, #000);
    }

    .time {
        font-size: 0.8rem;
        color: var(--text-secondary, #65676b);
    }

    .post-content p {
        padding: 0 var(--spacing-md) var(--spacing-sm);
        color: var(--text-primary);
    }

    .post-image img {
        width: 100%;
        display: block;
        max-height: 500px;
        object-fit: cover;
    }

    .post-stats {
        padding: var(--spacing-sm) var(--spacing-md);
        display: flex;
        justify-content: space-between;
        color: var(--text-secondary);
        font-size: 0.9rem;
        border-bottom: 1px solid var(--divider-color);
    }

    .post-stats .stat-right span {
        margin-left: var(--spacing-sm);
    }

    .post-actions {
        display: flex;
        padding: var(--spacing-xs) var(--spacing-md);
    }

    .action-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 12px 0; /* Larger touch target */
        font-weight: 600;
        color: var(--text-secondary);
        border-radius: var(--radius-sm);
        transition: background 0.2s;
        min-height: 48px;
    }

    .action-btn:hover {
        background: var(--bg-color);
    }

    .icon {
        font-size: 1.1rem;
    }
</style>

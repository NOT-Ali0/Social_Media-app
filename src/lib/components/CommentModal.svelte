<script>
    import { fade, scale } from "svelte/transition";
    import { modalStore } from "../stores/modalStore";
    import {handleComment,getCommentText,getPostId} from "./CommentFunc.svelte";
    import { onMount } from "svelte";
    import axios from "axios";
    let commentText = $state("");
    let myAvatar = localStorage.getItem("image")
    let PostID = $derived(getPostId())
    let handleCreateComments = ()=>{
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${PostID}/comments`,{
            body:commentText
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
        
    )
        .then(()=>handleComment(PostID))
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
      }
      


    

    function handleClose() {
        modalStore.close();
        commentText = "";
    }
    
    function handleSubmit() {
        if (!commentText.trim()) return;
        handleCreateComments()
        
        commentText = "";
    }
</script>

{#if $modalStore.isOpen}
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        on:click|self={handleClose}
        role="presentation"
    >
        <div
            class="modal-container"
            transition:scale={{ duration: 200, start: 0.9 }}
        >
            <div class="modal-header">
                <h3>Comments</h3>
                <button
                    class="close-btn"
                    on:click={handleClose}
                    aria-label="Close modal"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                    >
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                    </svg>
                </button>
            </div>

            <div class="comments-list">
                {#each getCommentText() as comment (comment.id)}
                    <div class="comment-item">
                        <img
                            src={comment.author?.profile_image}
                            alt={comment.author?.name}
                            class="comment-avatar"
                        />
                        <div class="comment-content">
                            <div class="comment-bubble">
                                <span class="comment-author"
                                    >{comment.author?.username}</span
                                >
                                <p class="comment-text">{comment.body}</p>
                            </div>
                            <!-- <span class="comment-time">{comment.time}</span> -->
                        </div>
                    </div>
                {/each}
            </div>

            <div class="modal-footer">
                <div class="input-wrapper">
                    <img
                        src={myAvatar}
                        alt="My Avatar"
                        class="my-avatar"
                    />
                    <div class="input-box">
                        <textarea
                            placeholder="Write a comment..."
                            bind:value={commentText}
                            rows="1"
                        ></textarea>
                        <button
                            class="submit-btn"
                            disabled={!commentText.trim()}
                            on:click={handleSubmit}
                            aria-label="Submit comment"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path
                                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
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
        background-color: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-md);
    }

    .modal-container {
        background: var(--card-bg);
        width: 100%;
        max-width: 600px;
        max-height: 85vh;
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        position: relative;
    }

    .modal-header {
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--divider-color);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .modal-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .close-btn {
        position: absolute;
        right: var(--spacing-sm);
        top: 50%;
        transform: translateY(-50%);
        padding: 8px;
        border-radius: 50%;
        background: var(--bg-color);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
    }

    .close-btn:hover {
        background: #e4e6eb;
        color: var(--text-primary);
    }

    .comments-list {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .comment-item {
        display: flex;
        gap: var(--spacing-sm);
    }

    .comment-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    .comment-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-width: 85%;
    }

    .comment-bubble {
        background: var(--bg-color);
        padding: 8px 12px;
        border-radius: 18px;
    }

    .comment-author {
        display: block;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--text-primary);
        margin-bottom: 2px;
    }

    .comment-text {
        font-size: 0.95rem;
        color: var(--text-primary);
        line-height: 1.4;
        margin: 0;
    }

    .comment-time {
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-left: var(--spacing-sm);
    }

    .modal-footer {
        padding: var(--spacing-md);
        border-top: 1px solid var(--divider-color);
        background: var(--card-bg);
        border-bottom-left-radius: var(--radius-lg);
        border-bottom-right-radius: var(--radius-lg);
    }

    .input-wrapper {
        display: flex;
        gap: var(--spacing-sm);
        align-items: flex-start;
    }

    .my-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    .input-box {
        flex: 1;
        background: var(--bg-color);
        border-radius: 20px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background 0.2s;
    }

    .input-box:focus-within {
        background: #e4e6eb;
    }

    .input-box textarea {
        flex: 1;
        border: none;
        background: transparent;
        resize: none;
        outline: none;
        padding: 4px 0;
        font-size: 0.95rem;
        color: var(--text-primary);
        font-family: inherit;
        min-height: 24px;
        max-height: 100px;
    }

    .submit-btn {
        color: var(--primary-color);
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
    }

    .submit-btn:disabled {
        color: var(--divider-color);
        cursor: default;
    }

    .submit-btn:not(:disabled):hover {
        background: rgba(24, 119, 242, 0.1);
    }

    /* Scrollbar Styling */
    .comments-list::-webkit-scrollbar {
        width: 8px;
    }

    .comments-list::-webkit-scrollbar-track {
        background: transparent;
    }

    .comments-list::-webkit-scrollbar-thumb {
        background-color: var(--divider-color);
        border-radius: 4px;
        border: 2px solid var(--card-bg);
    }

    @media (max-width: 768px) {
        .modal-backdrop {
            align-items: flex-end;
            padding: 0;
        }

        .modal-container {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            max-height: 80vh;
        }
    }
</style>

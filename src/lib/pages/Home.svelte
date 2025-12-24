<script>
    import PostCard from "../components/PostCard.svelte";
    import Button from "../components/Button.svelte";
    import CommentModal from "../components/CommentModal.svelte";
    import { onMount } from "svelte";
    import axios from "axios";
    let posts = $state([{}]);
    let pageCount = $state(1);
    let pageLimit = $state(0);
    let UploadPhoto = $state(false);
    let userPhoto = $state("");
    let BodyInput = $state("");
    const handlePreviousPage = () => {
        pageCount--;
        postsData();
    };

    const handleNextPage = () => {
        pageCount++;
        postsData();
    };

    // user store
    let username = $state("");
    onMount(() => {
        postsData();
        if (localStorage.getItem("username")) {
            username = localStorage.getItem("username");
        }
        if (localStorage.getItem("image")) {
            userPhoto = localStorage.getItem("image");
        }
    });
    

    let handleUploadField = () => {
        UploadPhoto = !UploadPhoto;
    };

    let postsData = () => {
        if (pageCount < 1) return;

        axios
            .get(
                `https://tarmeezacademy.com/api/v1/posts?limit=13&page=${pageCount}`,
            )
            .then((res) => {
                posts = res.data.data;
                pageLimit = res.data.meta.last_page;
            })
            .catch((err) => console.log(err));
    };

    function handlePost() {
        if (!BodyInput.trim()) return;

        let formData = new FormData();
        formData.append("body", BodyInput);
        formData.append("image", file);

        axios
            .post("https://tarmeezacademy.com/api/v1/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => console.log(res.data))
            .then(() => postsData())
            .then(() => (UploadPhoto = false))
            .catch(() => alert("something went wrong are you missing field?"))
            .catch((err) => console.log(err));

        const newPost = {
            id: crypto.randomUUID(),
            user: "",
            time: Date.now().toLocaleString(),
            body: BodyInput,
            image: file,
            likes: 0,
            comments: 0,
            shares: 0,
        };



        
        posts = [...posts, newPost];
        
        BodyInput = "";
        file = null;
        fileInput = null;
    }
    

    let fileInput = $state(null);
    let file = $state(null);

    let handleFileChange = (e) => {
        if (!fileInput) return;

        fileInput = e.target;
        file = fileInput.files[0];
    };
</script>

<div class="home-container">
    <div class="create-post-card">
        <div class="input-area">
            <div class="avatar">
                <img src={userPhoto} alt="User" />
            </div>
            <span class="username">{username}</span>
            <input
                type="text"
                placeholder="What's on your mind, User?"
                bind:value={BodyInput}
            />
        </div>
        <div class="divider"></div>
        <div class="actions">
            <div class="action-item">
                {#if UploadPhoto}
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        bind:this={fileInput}
                        onchange={(e) => handleFileChange(e)}
                    />
                {:else}
                    <div onclick={handleUploadField} class="Photo-post-cont">
                        <span class="icon">📷</span> Photo/Video
                    </div>
                {/if}
            </div>
            <div class="action-item">
                <span class="icon">😊</span> Feeling/Activity
            </div>
            <Button
                size="sm"
                on:click={handlePost}
                disabled={!BodyInput.trim() || !file}>Post</Button
            >
        </div>
    </div>

    <div class="feed">
        {#each posts as post (post.id)}
            <PostCard {post} />
        {/each}
    </div>
    <div class="pagination">
        <button onclick={handlePreviousPage}>Previous</button>
        <button onclick={handleNextPage}>Next</button>
    </div>
</div>

<CommentModal  />

<style>
    * {
        box-sizing: border-box;
    }

    .pagination {
        display: flex;
        justify-content: space-between;
        margin-top: var(--spacing-md);
    }

    .pagination button {
        cursor: pointer;
        padding: var(--spacing-sm);
        width: 5vw;
        background-color: rgb(94, 158, 255);
        border-radius: var(--radius-sm);
    }

    .Photo-post-cont {
        cursor: pointer;
        width: 10vw;
        border-radius: 20px;
        flex-direction: row;
        padding: 3px;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
    }

    .home-container {
        width: 100%;
        max-width: 680px;
    }

    .create-post-card {
        background: var(--card-bg);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .input-area {
        display: flex;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
        align-items: center;
    }

    .input-area input {
        height: 4vh;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .input-area input {
        flex: 1;
        border-radius: 20px;
        border: none;
        background: var(--bg-color);
        padding: 0 var(--spacing-md);
        outline: none;
    }

    .input-area input:hover {
        background: #e4e6eb;
    }

    .divider {
        height: 1px;
        background: var(--divider-color);
        margin: var(--spacing-sm) 0;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .action-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-secondary);
        font-weight: 600;
        padding: 8px;
        border-radius: var(--radius-sm);
        cursor: pointer;
    }

    .action-item:hover {
        background: var(--bg-color);
    }
</style>

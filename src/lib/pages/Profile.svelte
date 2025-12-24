<script>
    import PostCard from "../components/PostCard.svelte";
    import Button from "../components/Button.svelte";
    import { onMount } from "svelte";
    import axios from "axios";
    import { fade, scale } from "svelte/transition";
    import Filesinput from "../components/Filesinput.svelte";
    import PostCardProfile from "../components/PostCardProfile.svelte";
    import EditPostModal from "../components/EditPostModal.svelte";
    import { BodystateValue } from "../stores/BodyStateValue";
    let isOpen = $state(true);
    let username = $state("");
    let imageUrl = $state("");
    if (localStorage.getItem("image")) {
        imageUrl = localStorage.getItem("image");
    }
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
    }

    let profileposts = $state([]);

    


    let handleProfilePosts = () => {
        axios
            .get("https://tarmeezacademy.com/api/v1/posts")
            .then((res) => {
                profileposts = res.data.data.filter(
                    (post) => post.author.id == localStorage.getItem("id")
                );
            })
            .catch((err) => console.log(err));
    };


    // for (let i = 0; i < res.data.data.length; i++) {
    //                 if (
    //                     res.data.data[i].author.id == localStorage.getItem("id")
    //                 ) {
    //                     profileposts.push(res.data.data[i]);
    //                 }
    //             }


    onMount(() => {
        handleProfilePosts();
    });

    // editting section
    let title = $state("");
    let file = $state(null);
    let body = $state("");
    let handleClose = () => {
        isOpen = false;
    };
    let handleOpen = () => {
        isOpen = true;
    };
    let handleImageFile = (e) => {
        file = e.target.files[0];
    };
    let handleSubmit = () => {
        isOpen = false;
    };
</script>

<div class="profile-container">
    <div class="profile-header">
        <div class="cover-photo">
            <img src={imageUrl} alt="Cover" />
        </div>

        <div class="profile-info-section">
            <div class="profile-details">
                <div class="avatar-large">
                    <img src={imageUrl} alt={username} />
                </div>

                <div class="info">
                    <h1>{username}</h1>
                    <!-- <span class="friends">{user.friends} friends</span> -->
                </div>
            </div>

            <div class="profile-actions">
                <Button>
                    <span style="margin-right: 6px;">+</span> Add to Story
                </Button>
                <Button variant="secondary">
                    <span style="margin-right: 6px;">✏️</span> Edit Profile
                </Button>
            </div>
        </div>

        <div class="profile-nav">
            <div class="nav-item active">Posts</div>
            <div class="nav-item">About</div>
            <div class="nav-item">Friends</div>
            <div class="nav-item">Photos</div>
        </div>
    </div>

    <div class="profile-content">
        <div class="left-col">
            <div class="card intro">
                <h2>Intro</h2>
                <!-- <p>{user.bio}</p> -->
                <Button variant="secondary" fullWidth>Edit Bio</Button>
            </div>

            <div class="card photos">
                <div class="card-header">
                    <h2>Photos</h2>
                    <a href="#">See all photos</a>
                </div>
                <div class="photo-grid">
                    <div style="background: #ccc; aspect-ratio: 1;"></div>
                    <div style="background: #ddd; aspect-ratio: 1;"></div>
                    <div style="background: #eee; aspect-ratio: 1;"></div>
                </div>
            </div>
        </div>

        <div class="right-col">
            <div class="create-post-card">
                <!-- Reusing create post style roughly or componentize it if DRY is needed -->
                <input
                    type="text"
                    placeholder="Write something to yourself..."
                />
            </div>

            {#each profileposts as post (post.id)}
                <PostCardProfile on:reload={handleProfilePosts} {post} />
            {/each}
        </div>
    </div>
</div>
<EditPostModal on:reload={handleProfilePosts} />



<style>
    .profile-container {
        width: 100%;
        max-width: 940px;
    }

    .profile-header {
        background: white;
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
        padding-bottom: 0;
    }

    .cover-photo {
        height: 350px;
        background: linear-gradient(to bottom, #ccc, #eee);
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        overflow: hidden;
        position: relative;
    }

    .cover-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .profile-info-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 var(--spacing-xl) var(--spacing-md);
        margin-top: -30px;
    }

    .profile-details {
        display: flex;
        align-items: flex-end;
        gap: var(--spacing-md);
    }

    .avatar-large {
        width: 168px;
        height: 168px;
        border-radius: 50%;
        border: 4px solid white;
        overflow: hidden;
        position: relative;
    }

    .avatar-large img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .info h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 4px;
    }

    .friends {
        color: var(--text-secondary);
        font-weight: 600;
    }

    .profile-actions {
        display: flex;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
    }

    .profile-nav {
        display: flex;
        padding: 0 var(--spacing-xl);
        border-top: 1px solid var(--divider-color);
    }

    .nav-item {
        padding: var(--spacing-md);
        font-weight: 600;
        color: var(--text-secondary);
        border-bottom: 3px solid transparent;
        cursor: pointer;
    }

    .nav-item.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
    }

    .profile-content {
        display: grid;
        grid-template-columns: 2fr 3fr;
        gap: var(--spacing-md);
    }

    .card {
        background: var(--card-bg);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
    }

    .card h2 {
        font-size: 1.25rem;
        margin-bottom: var(--spacing-md);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);
    }

    .photo-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        border-radius: var(--radius-md);
        overflow: hidden;
    }

    .create-post-card {
        background: var(--card-bg);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
    }

    .create-post-card input {
        width: 100%;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: 20px;
        border: none;
        background: var(--bg-color);
        outline: none;
    }

    @media (max-width: 900px) {
        .profile-content {
            grid-template-columns: 1fr;
        }

        .profile-info-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: -84px;
        }

        .profile-details {
            flex-direction: column;
            align-items: center;
            margin-bottom: var(--spacing-md);
        }

        .avatar-large {
            width: 140px;
            height: 140px;
        }
    }
    /* editing style */

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
        max-width: 500px;
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
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .close-btn {
        padding: 8px;
        border-radius: 50%;
        background: var(--bg-color);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
    }

    .close-btn:hover {
        background: #e4e6eb;
        color: var(--text-primary);
    }

    .modal-body {
        padding: var(--spacing-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .input-group label {
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .input-group input,
    .input-group textarea {
        padding: 10px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--divider-color);
        background: var(--bg-color);
        color: var(--text-primary);
        font-family: inherit;
        font-size: 1rem;
        transition: border-color 0.2s;
        outline: none;
    }

    .input-group input:focus,
    .input-group textarea:focus {
        border-color: var(--primary-color);
        border-width: 2px;
        padding: 9px; /* adjust for border width */
    }

    .input-group textarea {
        resize: vertical;
        min-height: 100px;
    }

    .modal-footer {
        padding: var(--spacing-md);
        border-top: 1px solid var(--divider-color);
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
    }

    .btn-cancel {
        padding: 8px 16px;
        border-radius: var(--radius-sm);
        font-weight: 600;
        color: var(--text-secondary);
        background: transparent;
        transition: background 0.2s;
    }

    .btn-cancel:hover {
        background: var(--bg-color);
    }

    .btn-save {
        padding: 8px 24px;
        border-radius: var(--radius-sm);
        font-weight: 600;
        color: white;
        background: var(--primary-color);
        transition: opacity 0.2s;
    }

    .btn-save:hover {
        opacity: 0.9;
    }

    @media (max-width: 600px) {
        .modal-container {
            width: 95%;
        }
    }
</style>

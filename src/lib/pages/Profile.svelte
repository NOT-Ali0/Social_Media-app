<script>
    import PostCard from "../components/PostCard.svelte";
    import Button from "../components/Button.svelte";

    const user = {
        name: "Current User",
        bio: "Web Developer | Svelte Enthusiast",
        friends: 420,
        cover: "https://via.placeholder.com/940x350?text=Cover+Photo",
        avatar: "https://via.placeholder.com/168x168?text=Me",
    };

    let posts = [
        {
            id: 101,
            user: user.name,
            time: "1h",
            content: "Updated my profile picture! 😎",
            image: user.avatar,
            likes: 24,
            comments: 2,
            shares: 0,
        },
        {
            id: 102,
            user: user.name,
            time: "2 days ago",
            content: "Thinking about the future of web development...",
            image: "",
            likes: 10,
            comments: 4,
            shares: 1,
        },
    ];
</script>

<div class="profile-container">
    <div class="profile-header">
        <div class="cover-photo">
            <img src={user.cover} alt="Cover" />
        </div>

        <div class="profile-info-section">
            <div class="profile-details">
                <div class="avatar-large">
                    <img src={user.avatar} alt={user.name} />
                </div>

                <div class="info">
                    <h1>{user.name}</h1>
                    <span class="friends">{user.friends} friends</span>
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
                <p>{user.bio}</p>
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

            {#each posts as post (post.id)}
                <PostCard {post} />
            {/each}
        </div>
    </div>
</div>

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
</style>

<script>
    export let post;
</script>

<div class="post-card">
    <div class="post-header">
        <div class="avatar">
            <img  src="profilePic.png" alt="">
        </div>
        <div class="user-info">
            <!-- <div class="name">{post.author.name}</div> -->
            <div class="time">{post.created_at}</div>
        </div>
        <button class="more-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"
                ><path
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                /></svg
            >
        </button>
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
        <button class="action-btn">
            <span class="icon">💬</span> Comment
        </button>
        <button class="action-btn">
            <span class="icon">↗️</span> Share
        </button>
    </div>
</div>

<style>

    .tags-cont{
        display: flex;
        width: 10vw;
        border-radius: 20px;
        flex-direction: row;
        padding: 3px;
        background-color: var(--bg-color);
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        gap: 5px;
    }

    .tags-cont p{
        padding: 3px;
        
    }
    .post-card {
        background: var(--card-bg);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
        width: 100%;
    }

    .post-header {
        padding: var(--spacing-md);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
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

    .user-info {
        flex: 1;
    }

    .name {
        font-weight: 600;
        color: var(--text-primary);
    }

    .time {
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    .more-btn {
        padding: 8px;
        border-radius: 50%;
        color: var(--text-secondary);
    }

    .more-btn:hover {
        background: var(--bg-color);
    }

    .more-btn svg {
        width: 20px;
        height: 20px;
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
        padding: var(--spacing-sm) 0;
        font-weight: 600;
        color: var(--text-secondary);
        border-radius: var(--radius-sm);
        transition: background 0.2s;
    }

    .action-btn:hover {
        background: var(--bg-color);
    }

    .icon {
        font-size: 1.1rem;
    }
</style>

<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const image = localStorage.getItem("image");
    function go(page) {
        dispatch("navigate", page);
    }
</script>

<nav class="navbar">
    <div class="nav-left">
        <div class="logo" on:click={() => go("home")}>
            <span>S</span>
        </div>
        <div class="search">
            <svg viewBox="0 0 20 20" fill="currentColor" class="search-icon">
                <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                />
            </svg>
            <input type="text" placeholder="Search" />
        </div>
    </div>

    <div class="nav-middle">
        <button class="nav-item active" on:click={() => go("home")}>
            <svg viewBox="0 0 24 24" fill="currentColor"
                ><path
                    d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.69L19.5 12h-2.03V19h-3.95v-6h-3.04v6H6.53V12H4.5L12 4.79z"
                /></svg
            >
        </button>
        <button class="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor"
                ><path
                    d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012 2v1h6a2 2 0 012 2v11a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1H9v2zm2-2h4V8h-4v11zm-6-2h4V5H5v12z"
                /></svg
            >
        </button>
        <button class="nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor"
                ><path
                    d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v4h-4V5zm-6 8h18v6H4v-6z"
                /></svg
            >
        </button>
    </div>

    <div class="nav-right">
        <button class="icon-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"
                ><path
                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                /></svg
            >
        </button>
        <div class="avatar" on:click={() => go("profile")}>
            <img src={image} alt="User" />
        </div>
    </div>
</nav>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--header-height);
        background: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 var(--spacing-md);
        z-index: 1000;
    }

    .nav-left,
    .nav-right {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        flex: 1;
    }

    .nav-right {
        justify-content: flex-end;
    }

    .nav-middle {
        flex: 2;
        display: flex;
        justify-content: center;
        gap: var(--spacing-sm);
    }

    .logo {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .search {
        background: var(--bg-color);
        border-radius: 20px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        width: 240px;
    }

    .search input {
        border: none;
        background: transparent;
        outline: none;
    }

    .search-icon {
        width: 16px;
        color: var(--text-secondary);
    }

    .nav-item {
        width: 100px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        color: var(--text-secondary);
        transition: all 0.2s;
    }

    .nav-item:hover,
    .nav-item.active {
        background: var(--bg-color);
        color: var(--primary-color);
    }

    .nav-item svg {
        width: 28px;
        height: 28px;
    }

    .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-btn svg {
        width: 20px;
        height: 20px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .search,
        .nav-middle {
            display: none;
        }
    }
</style>

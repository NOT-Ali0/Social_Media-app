<script>
    import { createEventDispatcher } from "svelte";
    export let activePage = "home";
    const dispatch = createEventDispatcher();

    function go(page) {
        dispatch("navigate", page);
    }

    let handleDeleteToken = () => {
        localStorage.removeItem("token");
        go("login");
    };

    const items = [
        { id: "home", label: "Feed", icon: "🏠" },
        { id: "profile", label: "Profile", icon: "👤" },
        { id: "friends", label: "Friends", icon: "👥" },
        { id: "pages", label: "Pages", icon: "🚩" },
        { id: "saved", label: "Saved", icon: "🔖" },
    ];
</script>

<aside class="sidebar">
    {#each items as item}
        <div
            class="menu-item {activePage === item.id ? 'active' : ''}"
            on:click={() => go(item.id)}
        >
            <span class="icon">{item.icon}</span>
            <span class="label">{item.label}</span>
        </div>
    {/each}

    <div class="divider"></div>

    <div class="menu-item" on:click={handleDeleteToken}>
        <span class="icon">🚪</span>
        <span class="label">Logout</span>
    </div>
</aside>

<style>
    .sidebar {
        width: var(--sidebar-width);
        height: calc(100vh - var(--header-height));
        position: fixed;
        top: var(--header-height);
        left: 0;
        padding: var(--spacing-md);
        overflow-y: auto;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-weight: 500;
        color: var(--text-primary);
        transition: background 0.2s;
    }

    .menu-item:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    .menu-item.active {
        color: var(--primary-color);
        background: rgba(24, 119, 242, 0.1);
    }

    .icon {
        font-size: 1.5rem;
    }

    .divider {
        height: 1px;
        background: var(--divider-color);
        margin: var(--spacing-md) 0;
    }

    @media (max-width: 900px) {
        .sidebar {
            width: 80px;
        }
        .label {
            display: none;
        }
        .menu-item {
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            padding: 0;
        }
    }

    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            height: 60px;
            position: fixed;
            bottom: 0;
            top: auto;
            left: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 0;
            background: var(--card-bg);
            box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .menu-item {
            width: auto;
            height: 100%;
            border-radius: 0;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .divider {
            display: none;
        }

        /* Optional: Hide Logout on mobile bar if it takes too much space, or keep it as icon */
    }
</style>

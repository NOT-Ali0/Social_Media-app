<script>
    export let variant = "primary"; // primary, secondary, ghost
    export let size = "md"; // sm, md, lg
    export let fullWidth = false;
    /** @type {"button" | "submit" | "reset"} */
    export let type = "button";
    export let disabled = false;
</script>

<button
    {type}
    {disabled}
    class="btn {variant} {size} {fullWidth ? 'full-width' : ''}"
    on:click
>
    <slot />
</button>

<style>
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        font-weight: 600;
        transition:
            background-color 0.2s,
            transform 0.1s;
        outline: none;
    }

    .btn:active {
        transform: scale(0.98);
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    /* Variants */
    .primary {
        background-color: var(--primary-color);
        color: white;
    }

    .primary:hover {
        background-color: var(--primary-hover);
    }

    .secondary {
        background-color: #e4e6eb;
        color: var(--text-primary);
    }

    .secondary:hover {
        background-color: #d8dadf;
    }

    .ghost {
        background-color: transparent;
        color: var(--text-secondary);
    }

    .ghost:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    /* Sizes */
    .sm {
        padding: 0 12px;
        height: 32px;
        font-size: 0.875rem;
    }

    .md {
        padding: 0 16px;
        height: 40px;
        font-size: 0.9375rem;
    }

    .lg {
        padding: 0 24px;
        height: 48px;
        font-size: 1rem;
    }

    .full-width {
        width: 100%;
    }
</style>

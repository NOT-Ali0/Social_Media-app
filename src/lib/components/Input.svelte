<script>
    export let type = "text";
    export let placeholder = "";
    export let value = "";
    export let label = "";
</script>

<div class="input-group">
    {#if label}
        <label>{label}</label>
    {/if}
    <input {type} {placeholder} bind:value on:input class="input" />
</div>

<style>
    .input-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        width: 100%;
    }

    label {
        font-size: 0.875rem;
        font-weight: 500;
    }

    .input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid var(--divider-color);
        border-radius: var(--radius-md);
        font-size: 1rem;
        outline: none;
        transition:
            border-color 0.2s,
            box-shadow 0.2s;
    }

    .input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
    }
</style>

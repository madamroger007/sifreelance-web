<script>
    export let isOpen = false;
    export let title = 'Confirm Delete';
    export let message = 'Are you sure you want to delete this item?';
    export let onConfirm = () => {};
    export let onCancel = () => {};

    function handleConfirm() {
        onConfirm();
        isOpen = false;
    }

    function handleCancel() {
        onCancel();
        isOpen = false;
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <p class="text-gray-600 mb-6">{message}</p>
            
            <div class="flex gap-3 justify-end">
                <button
                    on:click={handleCancel}
                    class="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
                <button
                    on:click={handleConfirm}
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
{/if}
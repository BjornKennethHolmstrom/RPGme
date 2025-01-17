<script lang="ts">
  import type { BaseFieldProps } from '../registry/fieldTypes';
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let name: string;
  export let description: string | undefined = undefined;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let value: any = undefined;
  export let editable: boolean = false;
  export let error: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  // Common field update handler
  function handleUpdate(newValue: any) {
    if (!editable || disabled) return;
    dispatch('update', newValue);
  }
</script>

<div class="field" class:disabled class:error={!!error}>
  <label for={id} class="field-label">
    {name}
    {#if required}
      <span class="text-red-500">*</span>
    {/if}
  </label>

  {#if description}
    <p class="field-description">{description}</p>
  {/if}

  <div class="field-content">
    <slot {handleUpdate} />
  </div>

  {#if error}
    <p class="field-error">{error}</p>
  {/if}
</div>

<style>
  .field {
    @apply space-y-1;
  }

  .field-label {
    @apply block text-sm font-medium text-gray-700;
  }

  .field-description {
    @apply text-xs text-gray-500;
  }

  .field-error {
    @apply text-xs text-red-500 mt-1;
  }

  .field.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .field.error .field-content {
    @apply border-red-500;
  }
</style>

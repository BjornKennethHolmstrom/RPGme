<script lang="ts">
  import type { ProgressField as ProgressFieldType } from '../registry/fieldTypes';
  import BaseField from './BaseField.svelte';

  export let field: ProgressFieldType;
  export let editable: boolean = false;

  let error: string | undefined;

  $: percentage = Math.round(((field.value || 0) - field.min) / (field.max - field.min) * 100);

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    dispatch('update', value);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<BaseField
  id={field.id}
  name={field.name}
  description={field.description}
  required={field.required}
  {editable}
  value={field.value}
  {error}
>
  <div slot="default" let:handleUpdate class="space-y-2">
    {#if editable}
      <div class="flex items-center gap-4">
        <input
          type="range"
          id={field.id}
          class="flex-1"
          value={field.value || field.min}
          min={field.min}
          max={field.max}
          disabled={!editable}
          on:input={handleInput}
        />
        {#if field.showValue}
          <span class="text-sm font-medium w-12 text-right">
            {percentage}%
          </span>
        {/if}
      </div>
    {/if}
    
    <div class="progress-bar" class:interactive={editable}>
      <div 
        class="progress-value" 
        style="width: {percentage}%"
        class:editable
      />
    </div>

    {#if field.showValue && !editable}
      <div class="text-sm text-gray-500 text-right">
        {percentage}%
      </div>
    {/if}
  </div>
</BaseField>

<style>
  .progress-bar {
    @apply w-full h-2 bg-gray-200 rounded-full overflow-hidden;
  }

  .progress-value {
    @apply h-full bg-blue-500 rounded-full transition-all duration-300;
  }

  .progress-value.editable {
    @apply bg-blue-600;
  }

  .progress-bar.interactive:hover .progress-value {
    @apply bg-blue-700;
  }

  input[type="range"] {
    @apply w-full accent-blue-500;
  }
</style>

<script lang="ts">
  import type { NumberField as NumberFieldType } from '../registry/fieldTypes';
  import BaseField from './BaseField.svelte';

  export let field: NumberFieldType;
  export let editable: boolean = false;

  let error: string | undefined;

  function validate(value: number): string | undefined {
    if (field.required && value === undefined) {
      return 'This field is required';
    }
    if (field.min !== undefined && value < field.min) {
      return `Must be at least ${field.min}${field.unit || ''}`;
    }
    if (field.max !== undefined && value > field.max) {
      return `Must be no more than ${field.max}${field.unit || ''}`;
    }
    return undefined;
  }

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    error = validate(value);
    if (!error) {
      dispatch('update', value);
    }
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
  <div slot="default" let:handleUpdate class="relative">
    {#if editable}
      <input
        type="number"
        id={field.id}
        class="field-input {field.unit ? 'pr-8' : ''}"
        value={field.value}
        min={field.min}
        max={field.max}
        step={field.step || 1}
        disabled={!editable}
        on:input={handleInput}
      />
      {#if field.unit}
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {field.unit}
        </span>
      {/if}
    {:else}
      <div class="field-display">
        {field.value !== undefined ? `${field.value}${field.unit || ''}` : ''}
      </div>
    {/if}
  </div>
</BaseField>

<style>
  .field-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .field-display {
    @apply p-2 bg-gray-50 rounded-md;
  }
</style>

<script lang="ts">
  import type { TextField as TextFieldType } from '../registry/fieldTypes';
  import BaseField from './BaseField.svelte';

  export let field: TextFieldType;
  export let editable: boolean = false;

  let error: string | undefined;

  function validate(value: string): string | undefined {
    if (field.required && !value) {
      return 'This field is required';
    }
    if (field.minLength && value.length < field.minLength) {
      return `Must be at least ${field.minLength} characters`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `Must be no more than ${field.maxLength} characters`;
    }
    return undefined;
  }

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    error = validate(input.value);
    if (!error) {
      dispatch('update', input.value);
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
  <div slot="default" let:handleUpdate>
    {#if editable}
      <input
        type="text"
        id={field.id}
        class="field-input"
        value={field.value || ''}
        placeholder={field.placeholder}
        maxlength={field.maxLength}
        disabled={!editable}
        on:input={handleInput}
      />
    {:else}
      <div class="field-display">
        {field.value || ''}
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

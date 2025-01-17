<script lang="ts">
  import { X, Plus } from 'lucide-svelte';
  import type { TagsField } from '$lib/types/template';
  import BaseField from './BaseField.svelte';

  export let field: TagsField;
  export let value: string[] = [];
  export let editable: boolean = false;

  let inputValue = '';
  let isAdding = false;
  let error: string | undefined;

  $: selectedTags = value || [];

  function addTag(tag: string) {
    if (!tag) return;
    if (field.maxTags && selectedTags.length >= field.maxTags) {
      error = `Maximum ${field.maxTags} tags allowed`;
      return;
    }
    if (!selectedTags.includes(tag)) {
      selectedTags = [...selectedTags, tag];
      dispatch('update', selectedTags);
    }
    inputValue = '';
    isAdding = false;
    error = undefined;
  }

  function removeTag(tag: string) {
    selectedTags = selectedTags.filter(t => t !== tag);
    dispatch('update', selectedTags);
    error = undefined;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(inputValue.trim());
    }
    if (event.key === 'Escape') {
      isAdding = false;
    }
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<BaseField {field} {error}>
  <div class="space-y-2">
    <!-- Selected Tags -->
    <div class="flex flex-wrap gap-2">
      {#each selectedTags as tag}
        <span 
          class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 
                 rounded-full text-sm group"
        >
          {tag}
          {#if editable}
            <button
              class="opacity-0 group-hover:opacity-100 transition-opacity"
              on:click={() => removeTag(tag)}
            >
              <X class="w-3 h-3" />
            </button>
          {/if}
        </span>
      {/each}
    </div>

    <!-- Add Tag Interface -->
    {#if editable}
      {#if isAdding}
        <div class="flex gap-2">
          {#if field.options}
            <select
              bind:value={inputValue}
              class="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a tag...</option>
              {#each field.options.filter(opt => !selectedTags.includes(opt)) as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          {:else}
            <input
              type="text"
              bind:value={inputValue}
              placeholder="Enter a tag..."
              on:keydown={handleKeydown}
              class="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          {/if}
          <button
            class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            on:click={() => addTag(inputValue.trim())}
          >
            Add
          </button>
          <button
            class="px-3 py-2 border rounded-md hover:bg-gray-50"
            on:click={() => isAdding = false}
          >
            Cancel
          </button>
        </div>
      {:else if (!field.maxTags || selectedTags.length < field.maxTags)}
        <button
          class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          on:click={() => isAdding = true}
        >
          <Plus class="w-4 h-4" />
          Add Tag
        </button>
      {/if}
    {/if}
  </div>
</BaseField>

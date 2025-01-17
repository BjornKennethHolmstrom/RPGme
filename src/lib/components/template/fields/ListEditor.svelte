<!-- src/lib/components/template/fields/ListEditor.svelte -->
<script lang="ts">
  import { Plus, X, GripVertical, Tag } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { createEventDispatcher } from 'svelte';

  interface ListItem {
    id: string;
    value: string;
    tag?: string;
    description?: string;
  }

  export let value: ListItem[] = [];
  export let editable: boolean = false;
  export let allowTags: boolean = false;
  export let allowDescriptions: boolean = false;
  export let placeholder: string = 'Add an item...';
  export let tags: string[] = []; // Available tags if allowTags is true

  let newItemValue = '';
  let newItemTag = '';
  let newItemDescription = '';
  let isAdding = false;

  const dispatch = createEventDispatcher();

  function addItem() {
    if (newItemValue.trim()) {
      const newItem: ListItem = {
        id: crypto.randomUUID(),
        value: newItemValue.trim(),
        ...(allowTags && newItemTag && { tag: newItemTag }),
        ...(allowDescriptions && newItemDescription && { description: newItemDescription })
      };

      value = [...value, newItem];
      dispatch('change', value);

      // Reset input fields
      newItemValue = '';
      newItemTag = '';
      newItemDescription = '';
      isAdding = false;
    }
  }

  function removeItem(id: string) {
    value = value.filter(item => item.id !== id);
    dispatch('change', value);
  }

  function moveItem(fromIndex: number, toIndex: number) {
    const item = value[fromIndex];
    value.splice(fromIndex, 1);
    value.splice(toIndex, 0, item);
    value = value; // Trigger reactivity
    dispatch('change', value);
  }

  let draggedItem: ListItem | null = null;
  let draggedOverItem: ListItem | null = null;

  function handleDragStart(item: ListItem) {
    draggedItem = item;
  }

  function handleDragOver(item: ListItem) {
    if (draggedItem && draggedItem !== item) {
      draggedOverItem = item;
    }
  }

  function handleDrop() {
    if (draggedItem && draggedOverItem) {
      const fromIndex = value.findIndex(item => item.id === draggedItem?.id);
      const toIndex = value.findIndex(item => item.id === draggedOverItem?.id);
      moveItem(fromIndex, toIndex);
    }
    draggedItem = null;
    draggedOverItem = null;
  }
</script>

<div class="space-y-2">
  <!-- List Items -->
  <div class="space-y-2">
    {#each value as item (item.id)}
      <div
        animate:flip
        draggable={editable}
        on:dragstart={() => handleDragStart(item)}
        on:dragover={() => handleDragOver(item)}
        on:drop={handleDrop}
        class="group flex items-center gap-2 p-2 bg-white rounded-md border {editable ? 'hover:border-blue-300 cursor-move' : ''} 
               {draggedOverItem?.id === item.id ? 'border-blue-500' : ''}"
      >
        {#if editable}
          <GripVertical size={16} class="text-gray-400 invisible group-hover:visible" />
        {/if}
        
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span>{item.value}</span>
            {#if item.tag}
              <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                {item.tag}
              </span>
            {/if}
          </div>
          {#if item.description}
            <p class="text-sm text-gray-500 mt-1">{item.description}</p>
          {/if}
        </div>

        {#if editable}
          <button
            class="p-1 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded"
            on:click={() => removeItem(item.id)}
          >
            <X size={16} />
          </button>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Add Item Interface -->
  {#if editable}
    {#if isAdding}
      <div class="p-3 border rounded-md bg-gray-50">
        <div class="space-y-3">
          <input
            type="text"
            bind:value={newItemValue}
            {placeholder}
            class="w-full px-3 py-2 border rounded-md"
            on:keydown={(e) => e.key === 'Enter' && addItem()}
          />

          {#if allowTags}
            <select
              bind:value={newItemTag}
              class="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a tag (optional)</option>
              {#each tags as tag}
                <option value={tag}>{tag}</option>
              {/each}
            </select>
          {/if}

          {#if allowDescriptions}
            <textarea
              bind:value={newItemDescription}
              placeholder="Add a description (optional)"
              class="w-full px-3 py-2 border rounded-md resize-none"
              rows="2"
            ></textarea>
          {/if}

          <div class="flex justify-end gap-2">
            <button
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              on:click={() => isAdding = false}
            >
              Cancel
            </button>
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              on:click={addItem}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    {:else}
      <button
        class="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
        on:click={() => isAdding = true}
      >
        <Plus size={20} />
        Add Item
      </button>
    {/if}
  {/if}
</div>

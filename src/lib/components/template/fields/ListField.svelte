<script lang="ts">
  import { flip } from 'svelte/animate';
  import { Plus, X, Tag, GripVertical } from 'lucide-svelte';
  import type { ListField as ListFieldType } from '../registry/fieldTypes';
  import BaseField from './BaseField.svelte';

  export let field: ListFieldType;
  export let editable: boolean = false;

  interface ListItem {
    id: string;
    value: string;
    tag?: string;
    description?: string;
  }

  let items: ListItem[] = field.value || [];
  let newItemValue = '';
  let newItemTag = '';
  let newItemDescription = '';
  let isAdding = false;
  let draggedItemId: string | null = null;

  function addItem() {
    if (newItemValue.trim()) {
      const newItem: ListItem = {
        id: crypto.randomUUID(),
        value: newItemValue.trim(),
        ...(field.allowTags && newItemTag && { tag: newItemTag }),
        ...(field.allowDescriptions && newItemDescription && { description: newItemDescription })
      };

      items = [...items, newItem];
      updateField();
      resetForm();
    }
  }

  function removeItem(id: string) {
    items = items.filter(item => item.id !== id);
    updateField();
  }

  function resetForm() {
    newItemValue = '';
    newItemTag = '';
    newItemDescription = '';
    isAdding = false;
  }

  function updateField() {
    dispatch('update', items);
  }

  function handleDragStart(item: ListItem) {
    draggedItemId = item.id;
  }

  function handleDragOver(e: DragEvent, targetId: string) {
    e.preventDefault();
    if (draggedItemId && draggedItemId !== targetId) {
      const fromIndex = items.findIndex(item => item.id === draggedItemId);
      const toIndex = items.findIndex(item => item.id === targetId);
      
      const newItems = [...items];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      
      items = newItems;
      updateField();
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
  value={items}
>
  <div slot="default" class="space-y-2">
    {#if items.length > 0}
      <div class="space-y-2">
        {#each items as item (item.id)}
          <div
            animate:flip
            draggable={editable}
            on:dragstart={() => handleDragStart(item)}
            on:dragover={(e) => handleDragOver(e, item.id)}
            class="flex items-start gap-2 p-2 bg-white rounded-md border group hover:border-blue-300 transition-colors"
          >
            {#if editable}
              <div class="pt-1 text-gray-400">
                <GripVertical size={16} class="cursor-grab" />
              </div>
            {/if}

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium">{item.value}</span>
                {#if item.tag}
                  <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
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
                class="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                on:click={() => removeItem(item.id)}
              >
                <X size={16} />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-4 text-gray-500 border-2 border-dashed rounded-md">
        No items added yet
      </div>
    {/if}

    {#if editable}
      {#if isAdding}
        <div class="p-4 border rounded-md bg-gray-50 space-y-3">
          <input
            type="text"
            bind:value={newItemValue}
            placeholder={field.placeholder || "Enter item..."}
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {#if field.allowTags}
            <select
              bind:value={newItemTag}
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a tag (optional)</option>
              {#each field.availableTags || [] as tag}
                <option value={tag}>{tag}</option>
              {/each}
            </select>
          {/if}

          {#if field.allowDescriptions}
            <textarea
              bind:value={newItemDescription}
              placeholder="Add a description (optional)"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="2"
            ></textarea>
          {/if}

          <div class="flex justify-end gap-2">
            <button
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              on:click={resetForm}
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
      {:else}
        <button
          class="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg 
                 text-gray-500 hover:border-blue-500 hover:text-blue-500 
                 flex items-center justify-center gap-2 transition-colors"
          on:click={() => isAdding = true}
        >
          <Plus size={20} />
          Add Item
        </button>
      {/if}
    {/if}
  </div>
</BaseField>

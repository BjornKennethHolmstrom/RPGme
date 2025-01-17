<script lang="ts">
  import { Github, Globe, Linkedin, Twitter, Plus, X, ExternalLink } from 'lucide-svelte';
  import type { LinksField } from '$lib/types/template';
  import BaseField from './BaseField.svelte';

  export let field: LinksField;
  export let value: Array<{ type: string; url: string }> = [];
  export let editable: boolean = false;

  let isAdding = false;
  let newLinkType = '';
  let newLinkUrl = '';
  let error: string | undefined;

  const linkTypes = {
    github: { icon: Github, label: 'GitHub', prefix: 'https://github.com/' },
    website: { icon: Globe, label: 'Website', prefix: 'https://' },
    linkedin: { icon: Linkedin, label: 'LinkedIn', prefix: 'https://linkedin.com/in/' },
    twitter: { icon: Twitter, label: 'Twitter', prefix: 'https://twitter.com/' },
    other: { icon: ExternalLink, label: 'Other', prefix: 'https://' }
  };

  $: links = value || [];
  $: availableTypes = (field.allowTypes || Object.keys(linkTypes))
    .filter(type => !links.find(link => link.type === type));

  function validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function addLink() {
    if (!newLinkType || !newLinkUrl) {
      error = 'Both type and URL are required';
      return;
    }
    if (!validateUrl(newLinkUrl)) {
      error = 'Please enter a valid URL';
      return;
    }
    
    links = [...links, { type: newLinkType, url: newLinkUrl }];
    dispatch('update', links);
    resetForm();
  }

  function removeLink(index: number) {
    links = links.filter((_, i) => i !== index);
    dispatch('update', links);
  }

  function resetForm() {
    newLinkType = '';
    newLinkUrl = '';
    isAdding = false;
    error = undefined;
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<BaseField {field} {error}>
  <div class="space-y-4">
    <!-- Existing Links -->
    {#if links.length > 0}
      <div class="space-y-2">
        {#each links as link, index}
          <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg group">
            <svelte:component 
              this={linkTypes[link.type]?.icon || linkTypes.other.icon} 
              class="w-5 h-5 text-gray-600"
            />
            <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 text-blue-600 hover:text-blue-700"
            >
              {link.url}
            </a>
            {#if editable}
              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
                on:click={() => removeLink(index)}
              >
                <X class="w-4 h-4" />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    <!-- Add Link Interface -->
    {#if editable && availableTypes.length > 0}
      {#if isAdding}
        <div class="space-y-3 p-4 bg-gray-50 rounded-lg">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                bind:value={newLinkType}
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type...</option>
                {#each availableTypes as type}
                  <option value={type}>{linkTypes[type].label}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                bind:value={newLinkUrl}
                placeholder={newLinkType ? linkTypes[newLinkType].prefix : 'https://'}
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div class="flex justify-end gap-2">
            <button
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              on:click={resetForm}
            >
              Cancel
            </button>
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              on:click={addLink}
            >
              Add Link
            </button>
          </div>
        </div>
      {:else}
        <button
          class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          on:click={() => isAdding = true}
        >
          <Plus class="w-4 h-4" />
          Add Link
        </button>
      {/if}
    {/if}
  </div>
</BaseField>

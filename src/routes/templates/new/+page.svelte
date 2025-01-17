<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import TemplateRenderer from '$lib/components/template/TemplateRenderer.svelte';
  import { developerTemplate } from '$lib/data/templates/developer';

  let template = developerTemplate;
  let templateData = {};

  function handleUpdate(event: CustomEvent) {
    templateData = event.detail.data;
    console.log('Updated data:', templateData);
  }
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="text-3xl font-bold mb-8">Create Your Character Sheet</h1>

  <div class="space-y-8">
    <TemplateRenderer
      {template}
      data={templateData}
      editable={true}
      on:update={handleUpdate}
    />

    <div class="flex justify-end">
      <button
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        on:click={() => console.log('Save sheet:', templateData)}
      >
        Save Sheet
      </button>
    </div>
  </div>
</div>

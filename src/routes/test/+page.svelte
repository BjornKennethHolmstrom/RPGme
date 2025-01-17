<script lang="ts">
  import TemplateRenderer from '$lib/components/template/TemplateRenderer.svelte';
  import { developerTemplate } from '$lib/data/templates/developer';

  let templateData = {};
  let isEditing = true;

  function handleUpdate(event: CustomEvent) {
    const { data } = event.detail;
    templateData = data;
    console.log('Template data updated:', templateData);
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Template Test</h1>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        on:click={() => isEditing = !isEditing}
      >
        {isEditing ? 'View Mode' : 'Edit Mode'}
      </button>
    </div>

    <TemplateRenderer
      template={developerTemplate}
      data={templateData}
      editable={isEditing}
      on:update={handleUpdate}
    />
  </div>
</div>

<script lang="ts">
  import TemplateRenderer from '$lib/components/template/TemplateRenderer.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;

  let sheetData = data.sheetData || {};
  
  function handleUpdate(event: CustomEvent) {
    sheetData = event.detail;
    // TODO: Save changes to the server
    console.log('Sheet data updated:', sheetData);
  }
</script>

{#if data.template}
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <TemplateRenderer 
        template={data.template} 
        data={sheetData} 
        editable={true}
        on:update={handleUpdate}
      />
    </div>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center text-gray-500">
      <p>Loading template...</p>
    </div>
  </div>
{/if}

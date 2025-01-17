<script lang="ts">
  import { t } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import TemplateEditor from '$lib/components/template/TemplateEditor.svelte';
  import { updateTemplate } from '$lib/api/templates';
  import type { PageData } from './$types';
  
  export let data: PageData;

  let saveInProgress = false;

  async function handleSave(event: CustomEvent) {
    saveInProgress = true;

    try {
      const templateData = event.detail;
      await updateTemplate(templateData.id, templateData);
      goto('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      // TODO: Add error notification
    } finally {
      saveInProgress = false;
    }
  }
</script>

<div class="min-h-screen py-8">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">
        {data.template ? `Edit ${data.template.name}` : $t('templates.editor.title')}
      </h1>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          on:click={() => goto('/templates')}
        >
          {$t('templates.editor.cancel')}
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={saveInProgress}
          on:click={() => document.dispatchEvent(new CustomEvent('saveTemplate'))}
        >
          {saveInProgress ? $t('templates.editor.saving') : $t('templates.editor.save')}
        </button>
      </div>
    </div>
  </div>

  {#if data.template}
    <TemplateEditor 
      template={data.template}
      on:save={handleSave}
    />
  {:else}
    <div class="flex items-center justify-center h-64">
      <p class="text-gray-500">{$t('templates.loading')}</p>
    </div>
  {/if}
</div>

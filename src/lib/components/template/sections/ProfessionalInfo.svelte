<script lang="ts">
  import { User, Briefcase, Calendar } from 'lucide-svelte';
  import type { TemplateSection } from '../../../types/developer-template';

  export let section: TemplateSection;
  export let data: Record<string, any> = {};
  export let editable: boolean = false;

  $: professionalInfo = data || {};

  function updateField(fieldId: string, value: any) {
    data[fieldId] = value;
    dispatch('update', data);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
  <!-- Section Header -->
  <div class="p-6 border-b border-gray-200">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-blue-50 rounded-lg">
        <User class="w-5 h-5 text-blue-500" />
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-900">{section.title}</h2>
        {#if section.description}
          <p class="text-sm text-gray-500">{section.description}</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Section Content -->
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each section.fields as field (field.id)}
        <div class="space-y-2">
          <label 
            for={field.id} 
            class="block text-sm font-medium text-gray-700"
          >
            {field.name}
            {#if field.required}
              <span class="text-red-500">*</span>
            {/if}
          </label>

          {#if field.description}
            <p class="text-xs text-gray-500">{field.description}</p>
          {/if}

          {#if editable}
            {#if field.type === 'text'}
              <div class="relative">
                <input
                  id={field.id}
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={professionalInfo[field.id] || ''}
                  on:input={(e) => updateField(field.id, e.currentTarget.value)}
                />
                {#if field.id === 'role'}
                  <Briefcase class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {/if}
              </div>
            {:else if field.type === 'number'}
              <div class="relative">
                <input
                  id={field.id}
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={professionalInfo[field.id] || ''}
                  on:input={(e) => updateField(field.id, Number(e.currentTarget.value))}
                />
                {#if field.id === 'experience'}
                  <Calendar class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {/if}
              </div>
            {:else if field.type === 'multiline'}
              <textarea
                id={field.id}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       min-h-[100px] resize-y"
                value={professionalInfo[field.id] || ''}
                on:input={(e) => updateField(field.id, e.currentTarget.value)}
              ></textarea>
            {/if}
          {:else}
            <div class="p-3 bg-gray-50 rounded-md">
              {#if field.type === 'multiline'}
                <p class="whitespace-pre-wrap">{professionalInfo[field.id] || ''}</p>
              {:else}
                <p>{professionalInfo[field.id] || ''}</p>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

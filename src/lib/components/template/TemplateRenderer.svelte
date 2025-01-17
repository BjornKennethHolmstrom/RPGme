<script lang="ts">
  import { User, Code, Folder, ChartBar, Link, Star, Image } from 'lucide-svelte';
  import type { Template } from '$lib/types/template';
  import TextField from './fields/TextField.svelte';
  import NumberField from './fields/NumberField.svelte';
  import ProgressField from './fields/ProgressField.svelte';
  import SkillTreeField from './fields/SkillField.svelte';
  import ListField from './fields/ListField.svelte';
  import StatBlockField from './fields/StatBlock.svelte';
  import TagsField from './fields/TagsField.svelte';
  import LinksField from './fields/LinksField.svelte';
  import ImageField from './fields/ImageField.svelte';
  
  export let template: Template;
  export let data: Record<string, any> = {};
  export let editable: boolean = false;

  // Default template values
  $: templateData = {
    name: template?.name ?? 'Loading...',
    description: template?.description ?? '',
    creator: template?.creator ?? null,
    category: template?.category ?? 'General',
    sections: template?.sections ?? [],
    tags: template?.tags ?? [],
    theme: template?.theme ?? {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#10b981',
      background: '#ffffff'
    },
    usageCount: template?.usageCount,
    rating: template?.rating
  };

  // Icon mapping
  const icons = {
    user: User,
    code: Code,
    folder: Folder,
    chart: ChartBar,
    link: Link,
    star: Star,
    image: Image
  };

  // Field component mapping
  const fieldComponents = {
    text: TextField,
    multiline: TextField,
    number: NumberField,
    progress: ProgressField,
    skill: SkillTreeField,
    list: ListField,
    stat: StatBlockField,
    tags: TagsField,
    links: LinksField,
    image: ImageField
  };

  function getIcon(iconName: string) {
    return icons[iconName] || User;
  }

  function getFieldComponent(type: string) {
    return fieldComponents[type];
  }

  function getLayoutClass(layout: string): string {
    switch (layout) {
      case 'double': return 'grid-cols-2';
      case 'triple': return 'grid-cols-3';
      case 'grid': return 'grid-cols-4';
      default: return 'grid-cols-1';
    }
  }

  function handleFieldUpdate(sectionId: string, fieldId: string, value: any) {
    data[fieldId] = value;
    dispatch('update', { sectionId, fieldId, value, data });
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div 
  class="template-container space-y-8"
style="--primary: {templateData.theme.primary}; 
       --secondary: {templateData.theme.secondary}; 
       --accent: {templateData.theme.accent}; 
       --background: {templateData.theme.background}"
>
  <!-- Template Header -->
  <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold">{templateData.name}</h1>
        {#if templateData.creator}
          <div class="text-sm opacity-75">
            By {templateData.creator.name}
          </div>
        {/if}
      </div>
      <p class="opacity-90">{templateData.description}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-white/10 rounded-full text-sm">
          {templateData.category}
        </span>
        {#each templateData.tags as tag}
          <span class="px-3 py-1 bg-white/10 rounded-full text-sm opacity-75">
            {tag}
          </span>
        {/each}
      </div>
    </div>
  </div>

  <!-- Sections -->
  {#each templateData.sections as section (section.id)}
    <div class="section bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-6">
        {#if section.icon}
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <svelte:component this={getIcon(section.icon)} size={20} />
          </div>
        {/if}
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            {section.title}
          </h2>
          {#if section.description}
            <p class="text-sm text-gray-500 mt-1">{section.description}</p>
          {/if}
        </div>
      </div>

      <div class="grid {getLayoutClass(section.layout)} gap-6">
        {#each section.fields as field (field.id)}
          {#if field.type in fieldComponents}
            <svelte:component 
              this={getFieldComponent(field.type)}
              {field}
              {editable}
              value={data[field.id]}
              on:update={(e) => handleFieldUpdate(section.id, field.id, e.detail)}
            />
          {:else}
            <div class="text-red-500 text-sm">
              Unsupported field type: {field.type}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/each}

  {#if templateData.usageCount !== undefined || templateData.rating !== undefined}
    <div class="stats flex gap-4 text-sm text-gray-500 justify-end">
      {#if templateData.usageCount !== undefined}
        <span>{templateData.usageCount} uses</span>
      {/if}
      {#if templateData.rating !== undefined}
        <span class="flex items-center gap-1">
          <Star class="w-4 h-4 text-yellow-400" />
          {templateData.rating.toFixed(1)}
        </span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .template-container {
    @apply max-w-4xl mx-auto p-6;
  }

  :global(.field-label) {
    @apply block text-sm font-medium text-gray-700;
  }

  :global(.field-description) {
    @apply text-xs text-gray-500 mt-1;
  }

  :global(.field-error) {
    @apply text-xs text-red-500 mt-1;
  }

  :global(.section) {
    @apply transition-shadow hover:shadow-md;
  }
</style>

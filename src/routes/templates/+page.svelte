<script lang="ts">
  import { Search, Filter, Star, Users, ChevronRight, Settings } from 'lucide-svelte';
  import { t } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import type { TemplateCategory } from '$lib/types/templates';
  import TemplateRenderer from '$lib/components/template/TemplateRenderer.svelte';
  import { developerTemplate } from '$lib/data/templates/developer';
  
  let loading = true;
  let selectedTemplate = null;
  let searchQuery = '';
  let selectedCategory: TemplateCategory | 'all' = 'all';
  let sortBy: 'popular' | 'recent' | 'rating' = 'popular';

  // Categories with their corresponding icons and colors
  const categories: Record<TemplateCategory, { icon: any, color: string }> = {
    Professional: { icon: Users, color: 'bg-blue-100 text-blue-800' },
    Creative: { icon: Star, color: 'bg-purple-100 text-purple-800' },
    Technical: { icon: Filter, color: 'bg-green-100 text-green-800' },
    Academic: { icon: Users, color: 'bg-yellow-100 text-yellow-800' },
    Personal: { icon: Users, color: 'bg-pink-100 text-pink-800' },
    Gaming: { icon: Users, color: 'bg-indigo-100 text-indigo-800' }
  };

  // For now, we'll use a static array with our developer template
  const templates = [
    {
      ...developerTemplate,
      category: 'Professional',
      usageCount: 1240,
      rating: 4.8,
      createdAt: new Date('2024-01-01'),
      creator: {
        name: 'RPGme Team',
      },
      tags: ['Developer', 'Full-Stack', 'Tech']
    }
  ];

  onMount(() => {
    loading = false;
  });

  function filterTemplates(templates) {
    return templates.filter(template => {
      if (selectedCategory !== 'all' && template.category !== selectedCategory) {
        return false;
      }
      
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }

  function startWithTemplate() {
    if (selectedTemplate) {
      window.location.href = `/sheets/new?template=${selectedTemplate.id}`;
    }
  }

  $: filteredTemplates = filterTemplates(templates);
</script>

<!-- Rest of your template remains the same -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">{$t('templates.title')}</h1>
    <p class="mt-2 text-gray-600">{$t('templates.subtitle')}</p>
  </div>

  <!-- Search and filters -->
  <div class="mb-8 space-y-4">
    <!-- Search and sort -->
    <div class="flex gap-4">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          bind:value={searchQuery}
          placeholder={$t('templates.search')}
          class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <select
        bind:value={sortBy}
        class="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="popular">{$t('templates.sort.popular')}</option>
        <option value="recent">{$t('templates.sort.recent')}</option>
        <option value="rating">{$t('templates.sort.rating')}</option>
      </select>
    </div>

    <!-- Category filters -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors
               {selectedCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        on:click={() => selectedCategory = 'all'}
      >
        {$t('templates.categories.all')}
      </button>
      {#each Object.entries(categories) as [category, { icon: Icon, color }]}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
                 {selectedCategory === category ? color : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedCategory = category as TemplateCategory}
        >
          <svelte:component this={Icon} class="w-4 h-4" />
          {$t(`templates.categories.${category}`)}
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-12 gap-8">
    <!-- Template list -->
    <div class="col-span-5">
      {#if loading}
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p class="mt-4 text-gray-600">{$t('templates.loading')}</p>
        </div>
      {:else if filteredTemplates.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-600">{$t('templates.noResults')}</p>
        </div>
      {:else}
        <div class="space-y-4">
          {#each filteredTemplates as template}
            <button
              class="w-full text-left p-4 border rounded-lg hover:shadow-md transition-all
                     {selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''}"
              on:click={() => selectedTemplate = template}
            >
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold">{template.name}</h3>
                <span class={categories[template.category].color + ' px-2 py-1 rounded-full text-xs'}>
                  {template.category}
                </span>
              </div>
              <p class="text-sm text-gray-600">{template.description}</p>
              
              {#if template.tags?.length}
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each template.tags as tag}
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  {/each}
                </div>
              {/if}

              <div class="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <Users class="w-4 h-4" />
                  {template.usageCount || 0} {$t('templates.stats.uses')}
                </span>
                <span>•</span>
                <span>{$t('templates.stats.by')} {template.creator?.name || 'Unknown'}</span>
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Template preview -->
    <div class="col-span-7 sticky top-8">
      {#if selectedTemplate}
        <div class="border rounded-lg bg-white overflow-hidden shadow-lg">
          <div class="p-4 border-b bg-gray-50">
            <h2 class="font-semibold">{$t('templates.preview.title')}</h2>
          </div>
          <div class="p-4">
            <TemplateRenderer template={selectedTemplate} editable={false} />
          </div>
          <div class="p-4 border-t bg-gray-50 flex justify-end gap-2">
            <button
              class="py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 
                     transition-colors flex items-center justify-center gap-2"
              on:click={() => {
                window.location.href = `/templates/${selectedTemplate.id || 'dev-template-v1'}/edit`;
              }}
            >
              {$t('templates.preview.edit')}
              <Settings class="w-4 h-4" />
            </button>
            <button
              class="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center justify-center gap-2"
              on:click={startWithTemplate}
            >
              {$t('templates.preview.use')}
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      {:else}
        <div class="border rounded-lg p-12 text-center text-gray-500">
          {$t('templates.preview.empty')}
        </div>
      {/if}
    </div>
  </div>
</div>

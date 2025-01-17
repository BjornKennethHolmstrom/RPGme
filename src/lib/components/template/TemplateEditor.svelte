<!-- src/lib/components/template/TemplateEditor.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { Layout, Plus, Trash2, ChevronUp, ChevronDown, Settings, Image } from 'lucide-svelte';
  import type { TemplateCategory, Field, Section, Template } from '$lib/types/templates';
  
  // Available categories for templates
  const categories: TemplateCategory[] = [
    'Professional',
    'Creative',
    'Technical',
    'Academic',
    'Personal',
    'Gaming'
  ];

  // Available field types with their configuration options
  const fieldTypes = {
    text: { label: 'Text', hasLength: true },
    number: { label: 'Number', hasRange: true },
    progress: { label: 'Progress Bar', hasRange: true },
    skill: { label: 'Skill', hasLevel: true },
    list: { label: 'List', hasTags: true },
    multiline: { label: 'Multi-line Text', hasLength: true },
    stat: { label: 'Stat', hasRange: true },
    tags: { label: 'Tags', hasOptions: true },
    links: { label: 'Links', hasTypes: true },
    image: { label: 'Image', hasUpload: true }
  };

  // Initial template state
  let template: Template = {
    name: 'New Template',
    description: 'Describe your template here',
    category: 'Professional',
    sections: [],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: 'current-user', // This should be set from auth context
    tags: [],
    theme: {
      primary: '#1a56db',
      secondary: '#7e22ce',
      accent: '#15803d',
      background: '#ffffff'
    }
  };

  // Field configuration state
  let activeFieldConfig: { sectionId: string; fieldId: string; } | null = null;

  function addSection() {
    template.sections = [
      ...template.sections,
      {
        id: crypto.randomUUID(),
        title: 'New Section',
        icon: 'layout',
        layout: 'single',
        fields: []
      }
    ];
  }

  function addField(sectionId: string) {
    template.sections = template.sections.map(section => {
      if (section.id === sectionId) {
        const newField: Field = {
          id: crypto.randomUUID(),
          name: 'New Field',
          type: 'text',
          description: '',
          required: false
        };
        return {
          ...section,
          fields: [...section.fields, newField]
        };
      }
      return section;
    });
  }

  function updateField(sectionId: string, fieldId: string, updates: Partial<Field>) {
    template.sections = template.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => 
            field.id === fieldId ? { ...field, ...updates } : field
          )
        };
      }
      return section;
    });
  }

  function removeSection(sectionId: string) {
    template.sections = template.sections.filter(s => s.id !== sectionId);
  }

  function removeField(sectionId: string, fieldId: string) {
    template.sections = template.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.filter(f => f.id !== fieldId)
        };
      }
      return section;
    });
  }

  function moveSection(sectionId: string, direction: 'up' | 'down') {
    const index = template.sections.findIndex(s => s.id === sectionId);
    if (direction === 'up' && index > 0) {
      [template.sections[index - 1], template.sections[index]] = 
      [template.sections[index], template.sections[index - 1]];
    } else if (direction === 'down' && index < template.sections.length - 1) {
      [template.sections[index], template.sections[index + 1]] = 
      [template.sections[index + 1], template.sections[index]];
    }
    template.sections = [...template.sections];
  }

  function addTag(tag: string) {
    if (!template.tags.includes(tag)) {
      template.tags = [...template.tags, tag];
    }
  }

  function removeTag(tag: string) {
    template.tags = template.tags.filter(t => t !== tag);
  }

  // Add save event handling
  let dispatch = createEventDispatcher();

  function saveTemplate() {
    dispatch('save', template);
  }

  // Listen for save event from parent
  onMount(() => {
    if (browser) {
      document.addEventListener('saveTemplate', saveTemplate);
    }

    return () => {
      if (browser) {
        document.removeEventListener('saveTemplate', saveTemplate);
      }
    };
  });
</script>

<div class="max-w-4xl mx-auto p-6">
  <!-- Template Header -->
  <div class="mb-8 space-y-4">
    <input
      type="text"
      bind:value={template.name}
      class="text-3xl font-bold w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      placeholder="Template Name"
    />
    <textarea
      bind:value={template.description}
      class="w-full h-20 p-2 border rounded resize-none"
      placeholder="Describe your template..."
    />
    
    <!-- Category and Tags -->
    <div class="flex gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          bind:value={template.category}
          class="w-full px-3 py-2 border rounded-md"
        >
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Visibility
        </label>
        <select
          bind:value={template.isPublic}
          class="w-full px-3 py-2 border rounded-md"
        >
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </select>
      </div>
    </div>

    <!-- Tags -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Tags
      </label>
      <div class="flex flex-wrap gap-2">
        {#each template.tags as tag}
          <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tag}
            <button
              class="hover:text-red-500"
              on:click={() => removeTag(tag)}
            >
              <Trash2 size={14} />
            </button>
          </span>
        {/each}
        <input
          type="text"
          placeholder="Add tag..."
          class="px-2 py-1 border rounded-md text-sm"
          on:keydown={(e) => {
            if (e.key === 'Enter') {
              addTag(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  </div>

  <!-- Theme Settings -->
  <div class="mb-8 p-4 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
      <Settings size={20} />
      Theme Settings
    </h3>
    <div class="grid grid-cols-2 gap-4">
      {#each Object.entries(template.theme) as [key, value]}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)} Color
          </label>
          <div class="flex gap-2">
            <input
              type="color"
              bind:value={template.theme[key]}
              class="h-8 w-8 rounded cursor-pointer"
            />
            <input
              type="text"
              bind:value={template.theme[key]}
              class="flex-1 px-2 border rounded"
            />
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Sections -->
  <div class="space-y-6">
    {#each template.sections as section}
      <div class="border rounded-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1">
            <input
              type="text"
              bind:value={section.title}
              class="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              placeholder="Section Title"
            />
            <input
              type="text"
              bind:value={section.description}
              class="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded mt-1"
              placeholder="Section description..."
            />
          </div>
          <div class="flex items-center gap-2">
            <select
              bind:value={section.icon}
              class="px-2 py-1 border rounded"
            >
              <option value="layout">Layout</option>
              <option value="user">User</option>
              <option value="code">Code</option>
              <option value="folder">Folder</option>
              <option value="chart">Chart</option>
              <option value="link">Link</option>
              <option value="image">Image</option>
            </select>
            <select
              bind:value={section.layout}
              class="px-2 py-1 border rounded"
            >
              <option value="single">Single Column</option>
              <option value="double">Two Columns</option>
              <option value="triple">Three Columns</option>
              <option value="grid">Grid</option>
            </select>
            <button
              on:click={() => moveSection(section.id, 'up')}
              class="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronUp size={20} />
            </button>
            <button
              on:click={() => moveSection(section.id, 'down')}
              class="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown size={20} />
            </button>
            <button
              on:click={() => removeSection(section.id)}
              class="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <!-- Fields -->
        <div class="space-y-4 mb-4">
          {#each section.fields as field}
            <div class="space-y-2">
              <!-- Field Header -->
              <div class="flex items-center gap-4 p-2 bg-gray-50 rounded">
                <input
                  type="text"
                  bind:value={field.name}
                  class="flex-1 px-2 py-1 border rounded"
                  placeholder="Field Name"
                />
                <select
                  bind:value={field.type}
                  class="px-2 py-1 border rounded"
                >
                  {#each Object.entries(fieldTypes) as [type, config]}
                    <option value={type}>{config.label}</option>
                  {/each}
                </select>
                <label class="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    bind:checked={field.required}
                    class="rounded border-gray-300 text-blue-600"
                  />
                  <span class="text-sm">Required</span>
                </label>
                <button
                  on:click={() => removeField(section.id, field.id)}
                  class="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <!-- Field Configuration -->
              <div class="pl-4">
                <input
                  type="text"
                  bind:value={field.description}
                  class="w-full px-2 py-1 text-sm border rounded"
                  placeholder="Field description..."
                />

                <!-- Type-specific configuration -->
                {#if fieldTypes[field.type].hasLength}
                  <div class="flex gap-4 mt-2">
                    <label class="flex items-center gap-2 text-sm">
                      Min Length:
                      <input
                        type="number"
                        bind:value={field.minLength}
                        class="w-20 px-2 py-1 border rounded"
                        min="0"
                      />
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                      Max Length:
                      <input
                        type="number"
                        bind:value={field.maxLength}
                        class="w-20 px-2 py-1 border rounded"
                        min="0"
                      />
                    </label>
                  </div>
                {/if}

                {#if fieldTypes[field.type].hasRange}
                  <div class="flex gap-4 mt-2">
                    <label class="flex items-center gap-2 text-sm">
                      Min Value:
                      <input
                        type="number"
                        bind:value={field.min}
                        class="w-20 px-2 py-1 border rounded"
                      />
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                      Max Value:
                      <input
                        type="number"
                        bind:value={field.max}
                        class="w-20 px-2 py-1 border rounded"
                      />
                    </label>
                  </div>
                {/if}

                {#if fieldTypes[field.type].hasTags}
                  <div class="mt-2">
                    <label class="flex items-center gap-2 text-sm">
                      Available Tags:
                      <input
                        type="text"
                        bind:value={field.availableTags}
                        class="flex-1 px-2 py-1 border rounded"
                        placeholder="Comma-separated tags"
                      />
                    </label>
                  </div>
                {/if}

                {#if fieldTypes[field.type].hasUpload}
                  <div class="flex gap-4 mt-2">
                    <label class="flex items-center gap-2 text-sm">
                      Max Size (MB):
                      <input
                        type="number"
                        bind:value={field.maxSize}
                        class="w-20 px-2 py-1 border rounded"
                        min="1"
                      />
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                      Aspect Ratio:
                      <input
                        type="number"
                        bind:value={field.aspectRatio}
                        class="w-20 px-2 py-1 border rounded"
                        step="0.1"
                      />
                    </label>
                  </div>
                  <div class="mt-2">
                    <label class="text-sm block mb-1">Allowed Types:</label>
                    <div class="flex gap-2">
                      {#each ['image/jpeg', 'image/png', 'image/gif'] as type}
                        <label class="inline-flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={field.allowedTypes?.includes(type)}
                            on:change={(e) => {
                              const types = field.allowedTypes || [];
                              if (e.currentTarget.checked) {
                                field.allowedTypes = [...types, type];
                              } else {
                                field.allowedTypes = types.filter(t => t !== type);
                              }
                            }}
                            class="rounded border-gray-300 text-blue-600"
                          />
                          {type.split('/')[1].toUpperCase()}
                        </label>
                      {/each}
                    </div>
                  </div>
                {/if}

                {#if fieldTypes[field.type].hasOptions}
                  <div class="mt-2">
                    <label class="block text-sm mb-1">Options:</label>
                    <div class="flex flex-wrap gap-2">
                      {#each field.options || [] as option}
                        <span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm">
                          {option}
                          <button
                            class="hover:text-red-500"
                            on:click={() => {
                              field.options = field.options?.filter(opt => opt !== option);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </span>
                      {/each}
                      <input
                        type="text"
                        placeholder="Add option..."
                        class="px-2 py-1 border rounded text-sm"
                        on:keydown={(e) => {
                          if (e.key === 'Enter') {
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              field.options = [...(field.options || []), value];
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <button
          on:click={() => addField(section.id)}
          class="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Field
        </button>
      </div>
    {/each}
  </div>

  <!-- Add Section Button -->
  <button
    on:click={addSection}
    class="mt-6 w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
  >
    <Layout size={20} />
    Add Section
  </button>
</div>

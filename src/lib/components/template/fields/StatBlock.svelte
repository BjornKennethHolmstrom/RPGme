<script lang="ts">
  import type { StatBlockField } from '../types';
  
  export let field: StatBlockField;
  export let value: Record<string, number> = {};
  export let editable: boolean = false;

  function updateStat(stat: string, newValue: number) {
    if (editable) {
      value[stat] = Math.min(
        field.stats.find(s => s.name === stat)?.max || 100,
        Math.max(
          field.stats.find(s => s.name === stat)?.min || 0,
          newValue
        )
      );
      dispatch('change', value);
    }
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
  {#each field.stats as stat}
    <div class="p-4 border rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <span class="font-medium">{stat.name}</span>
        <span class="text-sm text-gray-500">{stat.abbreviation}</span>
      </div>
      
      {#if editable}
        <input
          type="number"
          class="w-full px-3 py-2 border rounded"
          value={value[stat.name] || stat.defaultValue}
          min={stat.min}
          max={stat.max}
          on:input={(e) => updateStat(stat.name, parseInt(e.currentTarget.value))}
        />
      {:else}
        <div class="text-2xl font-bold text-center">
          {value[stat.name] || stat.defaultValue}
        </div>
      {/if}
      
      <p class="text-sm text-gray-600 mt-2">{stat.description}</p>
    </div>
  {/each}
</div>

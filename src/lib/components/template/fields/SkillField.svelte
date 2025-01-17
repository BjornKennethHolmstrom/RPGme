<script lang="ts">
  import type { SkillTreeField } from '../types';
  import { Star, Lock, Check } from 'lucide-svelte';

  export let field: SkillTreeField;
  export let value: Record<string, number> = {};
  export let editable: boolean = false;

  function canLevel(skillId: string): boolean {
    const skill = field.skills.find(s => s.id === skillId);
    if (!skill) return false;

    // Check if current level is below max
    if ((value[skillId] || 0) >= skill.maxLevel) return false;

    // Check dependencies
    return !skill.dependencies?.some(depId => 
      (value[depId] || 0) < (field.skills.find(s => s.id === depId)?.level || 1)
    );
  }

  function levelUp(skillId: string) {
    if (editable && canLevel(skillId)) {
      value[skillId] = (value[skillId] || 0) + 1;
      dispatch('change', value);
    }
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-3 gap-4">
  {#each field.skills as skill}
    <div class="p-4 border rounded-lg {canLevel(skill.id) ? 'border-blue-200 hover:border-blue-400' : 'border-gray-200'} 
                {editable && canLevel(skill.id) ? 'cursor-pointer' : ''}"
         on:click={() => levelUp(skill.id)}>
      <div class="flex items-center gap-2 mb-2">
        {#if skill.icon}
          <img src={skill.icon} alt="" class="w-6 h-6" />
        {/if}
        <h3 class="font-medium">{skill.name}</h3>
        {#if !canLevel(skill.id) && (value[skill.id] || 0) < skill.maxLevel}
          <Lock size={16} class="text-gray-400" />
        {/if}
      </div>
      
      <p class="text-sm text-gray-600 mb-2">{skill.description}</p>
      
      <div class="flex items-center gap-1">
        {#each Array(skill.maxLevel) as _, i}
          <Star 
            size={16} 
            class={i < (value[skill.id] || 0) ? 'text-yellow-400' : 'text-gray-300'} 
          />
        {/each}
      </div>
    </div>
  {/each}
</div>

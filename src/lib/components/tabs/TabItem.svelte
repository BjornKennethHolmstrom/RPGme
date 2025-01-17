<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { LucideIcon } from 'lucide-svelte';

  export let value: string;
  export let label: string;
  export let icon: ComponentType;
  export let active: boolean;
  export let styles: {
    activeTab: string;
    inactiveTab: string;
  };
</script>

<button 
  on:click
  class="px-4 py-2 flex items-center gap-2 transition-colors {active ? styles.activeTab : styles.inactiveTab}"
>
  <svelte:component this={icon} size={16} />
  {label}
</button>

<script lang="ts">
  import type { LucideIcon } from 'lucide-svelte';
  
  export let activeTab: string;
  export let variant: 'default' | 'dark' = 'default';
  
  // Styling based on variant
  const styles = {
    default: {
      nav: 'flex bg-gray-100',
      activeTab: 'bg-white',
      inactiveTab: 'hover:bg-gray-50'
    },
    dark: {
      nav: 'flex bg-gray-700 text-white',
      activeTab: 'bg-gray-600',
      inactiveTab: 'hover:bg-gray-600'
    }
  };

  // Make styles available to slots
  $: currentStyles = styles[variant];
</script>

<div class="w-full">
  <nav class={currentStyles.nav}>
    <slot name="tabs" {currentStyles}></slot>
  </nav>
  <div class="bg-white p-6 rounded-b-lg shadow">
    <slot name="content"></slot>
  </div>
</div>

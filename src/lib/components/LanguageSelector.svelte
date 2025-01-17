<script lang="ts">
  import { locale } from 'svelte-i18n';
  import { Globe, Check } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { clickOutside } from '$lib/actions/clickOutside';
  
  interface Language {
    code: string;
    nativeName: string;
    name: string;
    flag: string;
  }

  const languages: Language[] = [
    { code: 'en', nativeName: 'English', name: 'English', flag: '🇬🇧' },
    { code: 'sv', nativeName: 'Svenska', name: 'Swedish', flag: '🇸🇪' }
  ];

  let isOpen = false;
  let buttonRef: HTMLButtonElement;

  function switchLanguage(langCode: string) {
    if (browser) {
      localStorage.setItem('lang', langCode);
    }
    locale.set(langCode);
    isOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        isOpen = false;
        buttonRef?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusPreviousItem();
        break;
    }
  }

  function focusNextItem() {
    const items = document.querySelectorAll('[role="menuitem"]');
    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
    (items[nextIndex] as HTMLElement).focus();
  }

  function focusPreviousItem() {
    const items = document.querySelectorAll('[role="menuitem"]');
    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    (items[previousIndex] as HTMLElement).focus();
  }

  $: currentLanguage = languages.find(lang => lang.code === $locale) || languages[0];
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="relative inline-block text-left" use:clickOutside={() => isOpen = false}>
  <button
    bind:this={buttonRef}
    type="button"
    class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md
           bg-white border border-gray-300 hover:bg-gray-50 
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    on:click={() => isOpen = !isOpen}
    aria-haspopup="true"
    aria-expanded={isOpen}
  >
    <Globe class="w-4 h-4 text-gray-500" />
    <span>{currentLanguage.flag}</span>
    <span class="hidden sm:inline">{currentLanguage.nativeName}</span>
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-56 rounded-md shadow-lg origin-top-right
             bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100
             focus:outline-none z-[100]"
      style="position: absolute; top: 100%; right: 0;"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu"
    >
      <div class="py-1">
        {#each languages as language (language.code)}
          <button
            class="group w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                   flex items-center justify-between gap-2 focus:bg-gray-100 focus:outline-none"
            role="menuitem"
            on:click={() => switchLanguage(language.code)}
          >
            <div class="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.nativeName}</span>
              <span class="text-xs text-gray-500">({language.name})</span>
            </div>
            {#if language.code === $locale}
              <Check class="w-4 h-4 text-blue-500" />
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Ensure the dropdown is above other content */
  div[role="menu"] {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    z-index: 1000;
  }

  button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
</style>

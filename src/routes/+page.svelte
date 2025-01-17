<script lang="ts">
  import { Feather, Scroll, Shield } from 'lucide-svelte';
  import { t } from 'svelte-i18n';
</script>

<div class="relative">
  <!-- Hero section -->
  <div class="relative py-24 overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6">
        {@html $t('home.hero.title')}
      </h1>
      <p class="max-w-2xl mx-auto text-lg sm:text-xl mb-8">
        {$t('home.hero.subtitle')}
      </p>
      <a
        href="/templates"
        class="inline-flex items-center px-8 py-3 rounded-lg bg-white 
               text-blue-600 font-medium text-lg hover:bg-gray-100 
               transform hover:-translate-y-0.5 transition-all"
      >
        {$t('home.hero.cta')}
        <Feather class="ml-2 w-5 h-5" />
      </a>
    </div>
  </div>

  <!-- Content sections -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Templates section -->
    <section class="mb-24">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
        <Scroll class="w-8 h-8 mr-3 text-blue-600" />
        {$t('home.templates.title')}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each Array(3) as _, i}
          <div class="group">
            <div class="relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300">
              <div class="relative p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Template {i + 1}</h3>
                <p class="text-gray-700 mb-4">Description of template {i + 1}</p>
                <a
                  href={`/templates/${i}`}
                  class="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
                >
                  {$t('home.templates.useTemplate')} →
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Featured sheets section -->
    <section>
      <h2 class="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
        <Shield class="w-8 h-8 mr-3 text-blue-600" />
        {$t('home.featured.title')}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each Array(4) as _, i}
          <div class="relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300">
            <div class="relative p-6">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900">Character {i + 1}</h3>
                  <p class="text-gray-700">Level 10 Wizard</p>
                </div>
              </div>
              <a
                href={`/sheets/${i}`}
                class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
              >
                {$t('home.featured.viewSheet')} →
              </a>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .hero-section {
    text-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
</style>


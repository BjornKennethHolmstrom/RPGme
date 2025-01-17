<script lang="ts">
  import '../app.css';
  import { Scroll, Map, Compass, Settings } from 'lucide-svelte';
  import { t } from 'svelte-i18n';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Navigation - Added z-50 and relative -->
  <nav class="relative z-50 border-b border-gray-200 backdrop-blur-sm bg-white/90 text-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a href="/" class="text-xl font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              RPGme
            </a>
          </div>

          <!-- Nav Links -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="/" class="nav-link">
              <Scroll class="w-4 h-4 mr-2" />
              {$t('nav.home')}
            </a>
            <a href="/templates" class="nav-link">
              <Map class="w-4 h-4 mr-2" />
              {$t('nav.templates')}
            </a>
            <a href="/explore" class="nav-link">
              <Compass class="w-4 h-4 mr-2" />
              {$t('nav.explore')}
            </a>
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <LanguageSelector />
          <button class="p-2 rounded-full text-gray-900 hover:text-blue-600">
            <Settings class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main content - Added z-0 -->
  <main class="relative z-0">
    <slot />
  </main>

  <!-- Footer - Added z-50 -->
  <footer class="relative z-50 border-t border-gray-200 backdrop-blur-sm bg-white/90 text-gray-900">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-600">
        RPGme - Where Every Profile Tells a Tale
      </p>
    </div>
  </footer>
</div>

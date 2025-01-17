<!-- src/lib/components/CharacterSheet.svelte -->
<script lang="ts">
  import { Shield, Sword, Brain, Heart, Star, Book } from 'lucide-svelte';
  import Tabs from './tabs/Tabs.svelte';
  import TabItem from './tabs/TabItem.svelte';
  
  let activeTab = 'basic';
  
  const tabs = [
    { value: 'basic', label: 'Basic Info', icon: Shield },
    { value: 'stats', label: 'Stats', icon: Sword },
    { value: 'skills', label: 'Skills', icon: Brain },
    { value: 'quests', label: 'Quests', icon: Book }
  ];
</script>

<div class="max-w-4xl mx-auto p-4">
  <!-- Header -->
  <div class="bg-gray-800 text-white p-6 rounded-t-lg">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Sarah Chen</h1>
        <p class="text-gray-400">Level 28 Full-Stack Developer</p>
      </div>
      <div class="flex gap-4">
        <div class="text-center">
          <Shield class="mx-auto" />
          <span class="text-sm">Online</span>
        </div>
        <div class="text-center">
          <Star class="mx-auto" />
          <span class="text-sm">Premium</span>
        </div>
      </div>
    </div>
  </div>

  <Tabs {activeTab} variant="dark">
    <svelte:fragment slot="tabs" let:currentStyles>
      {#each tabs as tab}
        <TabItem 
          value={tab.value}
          label={tab.label}
          icon={tab.icon}
          active={activeTab === tab.value}
          styles={currentStyles}
          on:click={() => activeTab = tab.value}
        />
      {/each}
    </svelte:fragment>

    <svelte:fragment slot="content">
      {#if activeTab === 'basic'}
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h2 class="text-xl font-bold mb-4">Character Info</h2>
            <div class="space-y-2">
              <p><span class="font-bold">Class:</span> Full-Stack Developer</p>
              <p><span class="font-bold">Alignment:</span> Chaotic Good</p>
              <p><span class="font-bold">Race:</span> Human</p>
              <p><span class="font-bold">Location:</span> San Francisco, CA</p>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Background</h2>
            <p class="text-gray-600">
              Started coding at age 12, graduated from MIT with CS degree. 
              Currently working on AI-powered web applications and contributing 
              to open source projects in spare time.
            </p>
          </div>
        </div>

      {:else if activeTab === 'stats'}
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h2 class="text-xl font-bold mb-4">Core Stats</h2>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span>Strength</span>
                <div class="w-32 bg-gray-200 rounded">
                  <div class="bg-blue-500 h-2 rounded w-1/2"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>Intelligence</span>
                <div class="w-32 bg-gray-200 rounded">
                  <div class="bg-blue-500 h-2 rounded w-4/5"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>Wisdom</span>
                <div class="w-32 bg-gray-200 rounded">
                  <div class="bg-blue-500 h-2 rounded w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Special Abilities</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>Debug Master: Can identify bugs with supernatural speed</li>
              <li>Code Whisperer: Systems mysteriously start working properly</li>
              <li>Stack Overflow Sage: Knows exactly what to search for</li>
            </ul>
          </div>
        </div>

      {:else if activeTab === 'skills'}
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h2 class="text-xl font-bold mb-4">Technical Skills</h2>
            <div class="space-y-2">
              <p><span class="font-bold">Languages:</span> JavaScript, Python, Rust</p>
              <p><span class="font-bold">Frameworks:</span> React, Node.js, Django</p>
              <p><span class="font-bold">Tools:</span> Git, Docker, AWS</p>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Soft Skills</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>Team Leadership</li>
              <li>Project Management</li>
              <li>Technical Writing</li>
              <li>Public Speaking</li>
            </ul>
          </div>
        </div>

      {:else if activeTab === 'quests'}
        <div class="space-y-4">
          <h2 class="text-xl font-bold mb-4">Current Quests</h2>
          <div class="border-l-4 border-green-500 pl-4 mb-4">
            <h3 class="font-bold">Launch AI-Powered Chat Application</h3>
            <p class="text-gray-600">Progress: 75% complete</p>
            <p class="text-sm text-gray-500">Reward: +500 XP, New Achievement Badge</p>
          </div>
          <div class="border-l-4 border-yellow-500 pl-4 mb-4">
            <h3 class="font-bold">Learn Rust Programming</h3>
            <p class="text-gray-600">Progress: 40% complete</p>
            <p class="text-sm text-gray-500">Reward: +300 XP, New Skill Unlock</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="font-bold">Contribute to Open Source</h3>
            <p class="text-gray-600">Progress: 25% complete</p>
            <p class="text-sm text-gray-500">Reward: +400 XP, Community Recognition</p>
          </div>
        </div>
      {/if}
    </svelte:fragment>
  </Tabs>
</div>

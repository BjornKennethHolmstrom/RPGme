<script lang="ts">
  import { Image, Upload, X } from 'lucide-svelte';
  import type { ImageField } from '$lib/types/template';
  import BaseField from './BaseField.svelte';

  export let field: ImageField;
  export let value: string | null = null;
  export let editable: boolean = false;

  let error: string | undefined;
  let dragOver = false;
  let inputRef: HTMLInputElement;

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    validateAndProcessFile(file);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (!file) return;
    validateAndProcessFile(file);
  }

  function validateAndProcessFile(file: File) {
    // Check file type
    if (field.allowedTypes && !field.allowedTypes.includes(file.type)) {
      error = `File type must be: ${field.allowedTypes.join(', ')}`;
      return;
    }

    // Check file size
    if (field.maxSize && file.size > field.maxSize) {
      error = `File size must be less than ${formatBytes(field.maxSize)}`;
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;

      // Check image dimensions and aspect ratio if needed
      if (field.aspectRatio) {
        const img = new Image();
        img.onload = () => {
          const actualRatio = img.width / img.height;
          if (Math.abs(actualRatio - field.aspectRatio!) > 0.1) {
            error = `Image must have an aspect ratio of ${field.aspectRatio}`;
            return;
          }
          updateValue(dataUrl);
        };
        img.src = dataUrl;
      } else {
        updateValue(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }

  function updateValue(newValue: string | null) {
    value = newValue;
    error = undefined;
    dispatch('update', newValue);
  }

  function removeImage() {
    value = null;
    if (inputRef) inputRef.value = '';
    dispatch('update', null);
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<BaseField {field} {error}>
  <div
    class="relative border-2 rounded-lg overflow-hidden transition-colors {dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}"
    on:dragenter|preventDefault={() => dragOver = true}
    on:dragleave|preventDefault={() => dragOver = false}
    on:dragover|preventDefault
    on:drop|preventDefault={handleDrop}
  >
    {#if value}
      <div class="relative aspect-square w-full">
        <img
          src={value}
          alt="Uploaded image"
          class="w-full h-full object-cover"
        />
        {#if editable}
          <button
            class="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500"
            on:click={removeImage}
          >
            <X class="w-4 h-4" />
          </button>
        {/if}
      </div>
    {:else if editable}
      <div class="p-8 text-center">
        <input
          type="file"
          bind:this={inputRef}
          accept={field.allowedTypes?.join(',')}
          class="hidden"
          on:change={handleFileSelect}
        />
        <button
          class="w-full flex flex-col items-center gap-2 text-gray-500 hover:text-blue-500"
          on:click={() => inputRef.click()}
        >
          <Upload class="w-8 h-8" />
          <div class="text-sm">
            <span class="font-medium">Click to upload</span>
            <span class="text-gray-400"> or drag and drop</span>
          </div>
          {#if field.allowedTypes}
            <p class="text-xs text-gray-400">
              Allowed formats: {field.allowedTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
          {/if}
          {#if field.maxSize}
            <p class="text-xs text-gray-400">
              Max size: {formatBytes(field.maxSize)}
            </p>
          {/if}
          {#if field.aspectRatio}
            <p class="text-xs text-gray-400">
              Required aspect ratio: {field.aspectRatio}:1
            </p>
          {/if}
        </button>
      </div>
    {:else}
      <div class="p-8 text-center text-gray-400">
        <Image class="w-8 h-8 mx-auto mb-2" />
        <p class="text-sm">No image uploaded</p>
      </div>
    {/if}
  </div>
</BaseField>

<style>
  /* Prevent text selection during drag and drop */
  div {
    user-select: none;
  }

  /* Smooth transitions */
  .transition-colors {
    transition: all 150ms ease-in-out;
  }
</style>

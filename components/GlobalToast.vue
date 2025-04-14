<template>
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-2 rounded shadow text-white transition-all',
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        ]"
      >
        {{ toast.message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { useToast } from '@/composables/useToast'
  const { toasts } = useToast()
  </script>
  
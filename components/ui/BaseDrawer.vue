<template>
    <transition name="slide">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
        <div class="w-full max-w-md bg-white p-6 shadow-xl overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">{{ title }}</h2>
            <button @click="close" class="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    isOpen: Boolean,
    title: String
  })
  
  const emit = defineEmits(['close'])
  
  function close() {
    emit('close')
  }
  </script>
  
  <style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  </style>
  
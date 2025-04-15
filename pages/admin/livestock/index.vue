<script setup>
import { ref } from 'vue'
import BaseDrawer from '@/components/ui/BaseDrawer.vue'
import LivestockForm from '@/components/forms/LivestockForm.vue'
import { useCookie } from '#app'


const isDrawerOpen = ref(false)

function openDrawer() {
  isDrawerOpen.value = true
}

function closeDrawer() {
  isDrawerOpen.value = false
}

const token = useCookie('admin_token') // ✅ get the cookie set at login

await $fetch('/api/livestock', {
  method: 'POST',
  body: data,
  headers: {
    Authorization: `Bearer ${token.value}`, // ✅ send real token
  },
})
    showToast('Livestock added successfully!', 'success')
    closeDrawer()
    // TODO: refresh table data here
  } catch (err) {
    console.error('Failed to submit livestock:', err)
    showToast('Failed to add livestock.', 'error')
  }
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Livestock</h1>
      <button @click="openDrawer" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
        Add New
      </button>
    </div>

    <!-- You can add your data table here -->

    <!-- Slide Drawer -->
    <BaseDrawer :isOpen="isDrawerOpen" title="Add Livestock" @close="closeDrawer">
      <LivestockForm @submit="handleFormSubmit" @cancel="closeDrawer" />
    </BaseDrawer>
  </div>
</template>

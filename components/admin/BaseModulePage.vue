<template>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">{{ title }}</h2>
        <button
          @click="showForm = true"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          + Add New
        </button>
      </div>
  
      <!-- Filter & Search Bar -->
      <div class="flex flex-wrap items-center gap-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="w-full sm:w-64 px-4 py-2 border rounded"
        />
        <!-- Optional: Add filters here -->
      </div>
  
      <!-- Data Table -->
      <div class="overflow-x-auto rounded shadow">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                class="px-4 py-3 text-left font-medium border-b"
              >
                {{ header.label }}
              </th>
              <th class="px-4 py-3 text-left font-medium border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedRows"
              :key="row.id"
              class="border-t hover:bg-gray-50"
            >
              <td
                v-for="header in headers"
                :key="header.key"
                class="px-4 py-2"
              >
                {{ row[header.key] }}
              </td>
              <td class="px-4 py-2 space-x-2">
                <button class="text-blue-600 hover:underline">View</button>
                <button class="text-yellow-600 hover:underline">Edit</button>
                <button class="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-end items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {{ page }}</span>
        <button
          @click="nextPage"
          :disabled="endIndex >= filteredRows.length"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
  
      <!-- Modal / Drawer Placeholder -->
      <div v-if="showForm" class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
        <div class="bg-white w-full max-w-lg p-6 rounded shadow relative z-50">
          <h3 class="text-lg font-semibold mb-4">Add / Edit {{ title }}</h3>
          <!-- Your form goes here -->
          <button class="absolute top-2 right-3 text-gray-500 hover:text-black" @click="showForm = false">
            &times;
          </button>
          <form>
            <!-- Form fields here -->
            <div class="mt-4 text-right">
              <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    title: { type: String, required: true },
    rows: { type: Array, required: true },
    headers: { type: Array, required: true },
  })
  
  const search = ref('')
  const page = ref(1)
  const perPage = 10
  const showForm = ref(false)
  
  const filteredRows = computed(() =>
    props.rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.value.toLowerCase())
      )
    )
  )
  
  const startIndex = computed(() => (page.value - 1) * perPage)
  const endIndex = computed(() => startIndex.value + perPage)
  const paginatedRows = computed(() => filteredRows.value.slice(startIndex.value, endIndex.value))
  
  const nextPage = () => {
    if (endIndex.value < filteredRows.value.length) page.value++
  }
  const prevPage = () => {
    if (page.value > 1) page.value--
  }
  </script>
  
<!-- <template>
  <div class="min-h-screen flex">
    // Sidebar 
    <aside class="w-64 bg-gray-900 text-white p-4">
      <h1 class="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav class="space-y-2">
        <NuxtLink to="/admin/dashboard" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="chart-line" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/livestock" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="cow" /> Livestock
        </NuxtLink>
        <NuxtLink to="/admin/clients" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="users" /> Clients
        </NuxtLink>
        <NuxtLink to="/admin/suppliers" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="truck" /> Suppliers
        </NuxtLink>
        <NuxtLink to="/admin/staff" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="user-tie" /> Staff
        </NuxtLink>
        <NuxtLink to="/admin/sheds" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="warehouse" /> Sheds
        </NuxtLink>
        <NuxtLink to="/admin/purchase" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="shopping-cart" /> Purchase
        </NuxtLink>
        <NuxtLink to="/admin/product" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="box" /> Products
        </NuxtLink>
        <NuxtLink to="/admin/payments" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="money-check-alt" /> Payments
        </NuxtLink>
        <NuxtLink to="/admin/food" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="utensils" /> Feeding
        </NuxtLink>
        <NuxtLink to="/admin/expense" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="file-invoice-dollar" /> Expenses
        </NuxtLink>
        <NuxtLink to="/admin/vaccinations" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="syringe" /> Vaccinations
        </NuxtLink>
        <NuxtLink to="/admin/reports" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="chart-bar" /> Reports
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="cog" /> Settings
        </NuxtLink>
        <NuxtLink to="/admin/profile" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="user" /> Profile
        </NuxtLink>
      </nav>
    </aside>

     //Main Content 
    <div class="flex-1 flex flex-col">
       Top Bar 
      <header class="flex items-center justify-between bg-white shadow px-6 py-4">
        <div class="flex items-center gap-3 w-full max-w-md">
          <FontAwesomeIcon icon="search" class="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div class="flex items-center gap-4">
          <button class="text-gray-700 hover:text-black">
            <FontAwesomeIcon icon="bell" class="text-xl" />
          </button>

          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center gap-2 text-gray-800 hover:text-gray-900">
              <img src="/default-avatar.png" alt="Avatar" class="w-8 h-8 rounded-full" />
              <FontAwesomeIcon icon="chevron-down" />
            </button>

            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
            >
              <NuxtLink to="/admin/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
              <NuxtLink to="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</NuxtLink>
            </div>
          </div>
        </div>
      </header>

       //Page Content 
      <main class="flex-1 bg-gray-100 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script> -->

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-4">
      <!-- Sidebar content -->
      <h1 class="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav class="space-y-2">       
        <NuxtLink to="/admin/dashboard" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="chart-line" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/livestock" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="cow" /> Livestock
        </NuxtLink>
        <NuxtLink to="/admin/clients" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="users" /> Clients
        </NuxtLink>
        <NuxtLink to="/admin/suppliers" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="truck" /> Suppliers
        </NuxtLink>
        <NuxtLink to="/admin/staff" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="user-tie" /> Staff
        </NuxtLink>
        <NuxtLink to="/admin/sheds" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="warehouse" /> Sheds
        </NuxtLink>
        <NuxtLink to="/admin/purchase" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="shopping-cart" /> Purchase
        </NuxtLink>
        <NuxtLink to="/admin/product" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="box" /> Products
        </NuxtLink>
        <NuxtLink to="/admin/payments" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="money-check-alt" /> Payments
        </NuxtLink>
        <NuxtLink to="/admin/food" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="utensils" /> Feeding
        </NuxtLink>
        <NuxtLink to="/admin/expense" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="file-invoice-dollar" /> Expenses
        </NuxtLink>
        <NuxtLink to="/admin/vaccinations" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="syringe" /> Vaccinations
        </NuxtLink>
        <NuxtLink to="/admin/reports" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="chart-bar" /> Reports
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="cog" /> Settings
        </NuxtLink>
        <NuxtLink to="/admin/profile" class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700">
          <FontAwesomeIcon icon="user" /> Profile
        </NuxtLink>        
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="flex items-center justify-between bg-white shadow px-6 py-4">
        <div class="flex items-center gap-3 w-full max-w-md">
          <FontAwesomeIcon icon="search" class="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div class="flex items-center gap-4">
          <button class="text-gray-700 hover:text-black">
            <FontAwesomeIcon icon="bell" class="text-xl" />
          </button>

          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center gap-2 text-gray-800 hover:text-gray-900">
              <img src="/default-avatar.png" alt="Avatar" class="w-8 h-8 rounded-full" />
              <FontAwesomeIcon icon="chevron-down" />
            </button>

            <div v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
              <NuxtLink to="/admin/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
              <NuxtLink to="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 bg-gray-100 p-6 overflow-auto">
        <slot />
      </main>
    </div>

    <!-- ✅ Global Toast Component -->
    <GlobalToast />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GlobalToast from '@/components/GlobalToast.vue' // ✅ Import it

const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>


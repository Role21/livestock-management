<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseDrawer from '@/components/ui/BaseDrawer.vue'
import StaffForm from '@/components/admin/forms/StaffForm.vue'
import { useFetch, useAsyncData, useRouter } from '#app'

const staffList = ref([])
const isDrawerOpen = ref(false)
const editingStaff = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 10

const fetchStaff = async () => {
  const { data, error } = await useFetch('/api/staff')
  if (!error.value && data.value?.success) {
    staffList.value = data.value.data
  }
}

function openDrawer(staff = null) {
  editingStaff.value = staff
  isDrawerOpen.value = true
}

function closeDrawer() {
  editingStaff.value = null
  isDrawerOpen.value = false
  fetchStaff()
}

async function deleteStaff(id) {
  if (confirm('Are you sure you want to delete this staff member?')) {
    const { error } = await useFetch(`/api/staff/${id}`, {
      method: 'DELETE',
    })
    if (!error.value) fetchStaff()
  }
}

const filteredStaff = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return staffList.value.filter(
    (s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.phone.includes(query) ||
      s.role.toLowerCase().includes(query)
  )
})

const paginatedStaff = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredStaff.value.slice(start, start + pageSize)
})

const totalPages = computed(() =>
  Math.ceil(filteredStaff.value.length / pageSize)
)

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(fetchStaff)
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Staff</h1>
      <button @click="openDrawer()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Staff</button>
    </div>

    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search staff..."
        class="w-full px-4 py-2 border rounded"
      />
    </div>

    <table class="min-w-full text-sm border">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone</th>
          <th class="px-4 py-2">Role</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in paginatedStaff" :key="staff.id" class="border-t">
          <td class="px-4 py-2">{{ staff.first_name }} {{ staff.last_name }}</td>
          <td class="px-4 py-2">{{ staff.email }}</td>
          <td class="px-4 py-2">{{ staff.phone }}</td>
          <td class="px-4 py-2">{{ staff.role }}</td>
          <td class="px-4 py-2 space-x-2">
            <button @click="openDrawer(staff)" class="text-blue-600 hover:underline">Edit</button>
            <button @click="deleteStaff(staff.id)" class="text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
    </div>

    <!-- Drawer -->
    <BaseDrawer :isOpen="isDrawerOpen" title="Staff Form" @close="closeDrawer">
      <StaffForm :initialData="editingStaff" @success="closeDrawer" @cancel="closeDrawer" />
    </BaseDrawer>
  </div>
</template>


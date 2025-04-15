<script setup>
import { ref, onMounted } from 'vue'
import RoleForm from '~/components/admin/forms/RoleForm.vue'
import { useToast } from 'vue-toastification'

const roles = ref([])
const drawerOpen = ref(false)
const selectedRole = ref(null)
const loading = ref(false)
const toast = useToast()

const fetchRoles = async () => {
  try {
    loading.value = true
    const res = await $fetch('/api/roles')
    if (res.success) {
      roles.value = res.data
    } else {
      throw new Error(res.message || 'Failed to fetch roles')
    }
  } catch (err) {
    toast.error(err.message)
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  selectedRole.value = null
  drawerOpen.value = true
}

const openEdit = (role) => {
  selectedRole.value = role
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const onSave = async () => {
  await fetchRoles()
  closeDrawer()
}

const onDelete = async (id) => {
  if (confirm('Are you sure you want to delete this role?')) {
    try {
      await $fetch(`/api/roles/${id}`, { method: 'DELETE' })
      toast.success('Role deleted')
      await fetchRoles()
    } catch (err) {
      toast.error('Delete failed')
    }
  }
}

onMounted(fetchRoles)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Roles</h1>
      <button @click="openCreate" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + Add Role
      </button>
    </div>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <table v-else class="min-w-full bg-white border">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Name</th>
          <th class="px-4 py-2 border">Email</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id" class="border-t">
          <td class="px-4 py-2 border">{{ role.id }}</td>
          <td class="px-4 py-2 border">{{ role.name }}</td>
          <td class="px-4 py-2 border">{{ role.email }}</td>
          <td class="px-4 py-2 border space-x-2">
            <button @click="openEdit(role)" class="text-blue-600 hover:underline">Edit</button>
            <button @click="onDelete(role.id)" class="text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Side Drawer -->
    <div
      class="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-lg transition-transform transform"
      :class="{ 'translate-x-0': drawerOpen, 'translate-x-full': !drawerOpen }"
    >
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">{{ selectedRole ? 'Edit Role' : 'Add Role' }}</h2>
        <button @click="closeDrawer" class="text-gray-500 hover:text-black">✕</button>
      </div>

      <div class="p-4">
        <RoleForm
          :initialData="selectedRole"
          @success="onSave"
          @cancel="closeDrawer"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Simple drawer transition */
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0%);
}
</style>

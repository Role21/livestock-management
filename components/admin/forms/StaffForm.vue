<script setup>
import { ref, onMounted, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'

const props = defineProps({
  initialData: Object,
})

const emit = defineEmits(['success', 'cancel'])

const toast = useToast()

const isEditMode = computed(() => !!props.initialData)

const roles = ref([])
const loading = ref(false)
const error = ref(null)

const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  role_id: yup.number().required('Role is required'),
  password: isEditMode.value
    ? yup.string().notRequired()
    : yup.string().required('Password is required').min(6),
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_id: '',
    password: '',
  },
})

const { value: first_name, errorMessage: firstNameError } = useField('first_name')
const { value: last_name, errorMessage: lastNameError } = useField('last_name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: role_id, errorMessage: roleError } = useField('role_id')
const { value: password, errorMessage: passwordError } = useField('password')

onMounted(async () => {
  await fetchRoles()
  if (isEditMode.value && props.initialData) {
    setValues({ ...props.initialData, password: '' })
  }
})

const fetchRoles = async () => {
  try {
    const res = await $fetch('/api/roles')
    if (res.success) {
      roles.value = res.data
    }
  } catch (err) {
    console.error('Failed to fetch roles:', err)
    toast.error('Failed to load roles')
  }
}

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  error.value = null
  try {
    const url = isEditMode.value
      ? `/api/staff/${props.initialData.id}`
      : '/api/staff'
    const method = isEditMode.value ? 'PUT' : 'POST'

    const res = await $fetch(url, {
      method,
      body: values,
    })

    if (res.success) {
      toast.success(isEditMode.value ? 'Staff updated' : 'Staff created')
      emit('success')
    } else {
      throw new Error(res.message || 'Something went wrong')
    }
  } catch (err) {
    error.value = err.message
    toast.error(error.value)
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium">First Name</label>
        <input v-model="first_name" class="form-input w-full" />
        <p class="text-red-500 text-sm mt-1">{{ firstNameError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium">Last Name</label>
        <input v-model="last_name" class="form-input w-full" />
        <p class="text-red-500 text-sm mt-1">{{ lastNameError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input v-model="email" type="email" class="form-input w-full" />
        <p class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium">Phone</label>
        <input v-model="phone" class="form-input w-full" />
        <p class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium">Role</label>
        <select v-model="role_id" class="form-select w-full">
          <option disabled value="">Select Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }} ({{ role.email }})
          </option>
        </select>
        <p class="text-red-500 text-sm mt-1">{{ roleError }}</p>
      </div>

      <div v-if="!isEditMode">
        <label class="block text-sm font-medium">Password</label>
        <input v-model="password" type="password" class="form-input w-full" />
        <p class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-6">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-input,
.form-select {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300;
}
</style>

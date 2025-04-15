<script setup>
import { ref, watch, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['success', 'cancel'])

const toast = useToast()
const isLoading = ref(false)

const schema = yup.object({
  name: yup.string().required('Role name is required'),
  email: yup.string().email('Invalid email').required('Email is required')
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: ''
  }
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      setValues({ name: data.name, email: data.email })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const isEditMode = computed(() => !!props.initialData?.id)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    if (isEditMode.value) {
      await $fetch(`/api/roles/${props.initialData.id}`, {
        method: 'PUT',
        body: values
      })
      toast.success('Role updated successfully')
    } else {
      await $fetch('/api/roles', {
        method: 'POST',
        body: values
      })
      toast.success('Role created successfully')
    }
    emit('success')
  } catch (error) {
    toast.error('Something went wrong')
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="block font-medium mb-1">Role Name</label>
      <input v-model="name" type="text" class="w-full input input-bordered" />
      <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
    </div>

    <div>
      <label class="block font-medium mb-1">Email</label>
      <input v-model="email" type="email" class="w-full input input-bordered" />
      <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
    </div>

    <div class="flex justify-end space-x-2 pt-2">
      <button type="button" @click="emit('cancel')" class="btn btn-ghost">Cancel</button>
      <button type="submit" :disabled="isLoading" class="btn btn-primary">
        {{ isEditMode ? 'Update Role' : 'Create Role' }}
      </button>
    </div>
  </form>
</template>

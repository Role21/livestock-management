<template>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <!-- Section: General Info -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-4">General Info</h2>
  
        <!-- Name -->
        <div class="mb-4">
          <label class="block mb-1 font-medium">Name <span class="text-red-500">*</span></label>
          <Field name="name" v-slot="{ field, errorMessage }">
            <input
              v-bind="field"
              type="text"
              placeholder="Enter name"
              class="w-full p-2 border rounded"
            />
            <span class="text-red-500 text-sm">{{ errorMessage }}</span>
          </Field>
        </div>
  
        <!-- Category (Dropdown) -->
        <div class="mb-4">
          <label class="block mb-1 font-medium">Category</label>
          <Field name="category" v-slot="{ field }">
            <select v-bind="field" class="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="cow">Cow</option>
              <option value="goat">Goat</option>
              <option value="chicken">Chicken</option>
            </select>
          </Field>
        </div>
  
        <!-- Date of Birth -->
        <div class="mb-4">
          <label class="block mb-1 font-medium">Date of Birth</label>
          <Field name="dob" v-slot="{ field }">
            <input type="date" v-bind="field" class="w-full p-2 border rounded" />
          </Field>
        </div>
  
        <!-- Active Toggle -->
        <div class="mb-4 flex items-center gap-2">
          <Field name="isActive" type="checkbox" />
          <label class="font-medium">Active</label>
        </div>
      </div>
  
      <!-- Submit Buttons -->
      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2 bg-gray-300 rounded" @click="onCancel">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { useForm, Field } from 'vee-validate'
  import * as yup from 'yup'
  
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    category: yup.string().nullable(),
    dob: yup.date().nullable(),
    isActive: yup.boolean().default(false),
  })
  
  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      category: '',
      dob: '',
      isActive: true,
    },
  })
  
  const onSubmit = (values) => {
    console.log('Form submitted:', values)
    // You can emit or save to API here
  }
  
  const onCancel = () => {
    console.log('Form canceled')
  }
  </script>
  
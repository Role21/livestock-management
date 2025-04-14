<template>
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Expenses vs Sales Over Time</h2>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
      <p v-else class="text-gray-500">Loading chart...</p>
    </div>
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const { data: rawData, pending } = await useFetch('/api/admin/charts/expense-vs-sales')
  
  const chartData = computed(() => {
    if (!rawData.value) return null
  
    return {
      labels: rawData.value.labels,
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#4ade80',
          data: rawData.value.sales
        },
        {
          label: 'Expenses',
          backgroundColor: '#f87171',
          data: rawData.value.expenses
        }
      ]
    }
  })
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
  </script>
  
  <style scoped>
  div {
    height: 300px;
  }
  </style>
  
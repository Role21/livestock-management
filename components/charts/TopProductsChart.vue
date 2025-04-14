<template>
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Top Products by Revenue</h2>
      <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
      <p v-else class="text-gray-500">Loading chart...</p>
    </div>
  </template>
  
  <script setup>
  import { Doughnut } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  const { data: rawData, pending } = await useFetch('/api/admin/charts/top-products')
  
  const chartData = computed(() => {
    if (!rawData.value) return null
  
    return {
      labels: rawData.value.labels,
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: ['#60a5fa', '#34d399', '#facc15', '#f87171', '#a78bfa'],
          data: rawData.value.revenue
        }
      ]
    }
  })
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false }
    }
  }
  </script>
  
  <style scoped>
  div {
    height: 300px;
  }
  </style>
  
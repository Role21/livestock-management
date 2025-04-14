<template>
    <div class="bg-white rounded-xl shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Livestock Population Trend</h2>
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
  
  const { data: apiData, pending } = await useFetch('/api/admin/charts/livestock-population')
  
  const chartData = computed(() => ({
    labels: apiData.value?.labels || [],
    datasets: [
      {
        label: 'Livestock Count',
        data: apiData.value?.data || [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }
  </script>
  
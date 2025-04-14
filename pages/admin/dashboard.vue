<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- KPI Cards -->
    <div v-if="pending" class="text-gray-500">Loading KPIs...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Total Livestock</h2>
        <p class="text-2xl font-semibold">{{ data.totalLivestock }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Monthly Sales</h2>
        <p class="text-2xl font-semibold">₦{{ data.monthlySales }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Outstanding Payments</h2>
        <p class="text-2xl font-semibold">₦{{ data.outstandingPayments }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Feed Stock Left</h2>
        <p class="text-2xl font-semibold">{{ data.feedStockLeft }} kg</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <LivestockPopulationChart class="xl:col-span-2" />
      <TopProductsChart />
    </div>
    <div class="mb-8">
      <ExpenseSalesChart />
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <p class="text-gray-500">Recent activity feed coming soon.</p>
    </div>
  </div>
</template>

<script setup>
import LivestockPopulationChart from '@/components/charts/LivestockPopulationChart.vue'
import ExpenseSalesChart from '@/components/charts/ExpenseSalesChart.vue'
import TopProductsChart from '@/components/charts/TopProductsChart.vue'

const { data, pending } = await useFetch('/api/admin/dashboard')

definePageMeta({
  layout: 'admin'
})
</script>

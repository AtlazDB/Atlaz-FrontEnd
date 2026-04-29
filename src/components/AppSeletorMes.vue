<script setup>
import { ref, onMounted } from 'vue'
import { workOrderService } from '@/services/workOrder.js'

const emit = defineEmits(['selected_date'])
const selected = ref(null)
const minimize = ref(true)
const selector_items = ref([])

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

onMounted(async () => {
  try {
    const workOrders = await workOrderService.list()

    const seen = new Set()
    const items = []

    workOrders.forEach((wo) => {
      const date = new Date(wo.departureDate)
      const month = date.getMonth()
      const year = date.getFullYear()
      const key = `${month}-${year}`

      if (!seen.has(key)) {
        seen.add(key)
        items.push({ title: monthNames[month], month, year })
      }
    })

    items.sort((a, b) => a.year - b.year || a.month - b.month)
    selector_items.value = items
  } catch (error) {
    console.error('Error loading months:', error)
  }
})
</script>

<template>
  <div class="selector" :class="{ closed: !minimize }">
    <h1 class="title">Dates</h1>

    <!--
  <select>
    <option value="1">2026</option>
    <option value="2">2025</option>
  </select>
  -->

    <div class="months" v-if="minimize">
      <div
        class="month_card"
        v-on:click="
          () => {
            selected = 'all'
            emit('selected_date', null)
          }
        "
        v-bind:class="{ active: selected === 'all' }"
      >
        <h1>All</h1>
      </div>

      <div
        class="month_card"
        v-for="item in selector_items"
        :key="item.title + item.year"
        v-on:click="
          () => {
            selected = item.title + item.year
            emit('selected_date', { month: item.month, year: item.year })
          }
        "
        v-bind:class="{ active: selected === item.title + item.year }"
      >
        <h1>{{ item.title }}</h1>
        <p>{{ item.year }}</p>
      </div>
    </div>

    <button class="minimizer" v-on:click="minimize = !minimize">
      <svg width="20" height="20" viewBox="0 0 24 24" :class="{ closed: !minimize }">
        <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.title {
  width: 130px;
  font-size: 24px;
}

.selector {
  height: 400px;
  width: fit-content;
  max-height: fit-content;
  margin: 20px 10px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
}

.selector.closed {
  position: absolute;
  top: 53px;
  right: 0;
}

.minimizer {
  width: stretch;
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
  margin-top: 5px;
}

svg {
  transition: 0.2s;
}

svg:hover {
  width: 25px;
  height: 25px;
}

svg.closed {
  transform: rotate(-180deg);
}

.months {
  display: flex;
  flex-direction: column;
  height: 230px;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 130px;
  margin-top: 10px;
}

.months:hover {
  overflow-y: auto;
}

.month_card {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-bottom: 5px;
  width: 130px;
  cursor: pointer;
}

.month_card:hover {
  color: #003366;
  opacity: 0.7;
}

.month_card.active {
  color: #ffffff;
  background: #003366;
  transition: 0.3s;
}

.min:active {
  color: #003366;
}

h1 {
  font-size: 16px;
}

p {
  font-size: 12px;
  margin: 0;
}
</style>
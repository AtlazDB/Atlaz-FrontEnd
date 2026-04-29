<script setup>
import { onMounted, ref, computed } from 'vue'
import { vehicleService } from '@/services/vehicleService.js'

const loading = ref(false)

const records = ref([
  /*
  {
    id: 1,
    prefix: 'AAA',
    type: 'UTILITY',
    vehicleStatus: 'AVAILABLE',
    model: {
      id: 1,
      modelName: 'Civic',
      brandName: 'Honda',
    },
  },
  {
    id: 2,
    prefix: 'AAB',
    type: 'PASSENGER',
    vehicleStatus: 'IN_USE',
    model: {
      id: 2,
      modelName: 'Uno',
      brandName: 'Fiat',
    },
  },
  {
    id: 3,
    prefix: 'AAC',
    type: 'UTILITY',
    vehicleStatus: 'MAINTENANCE',
    model: {
      id: 3,
      modelName: 'HB20',
      brandName: 'Hyundai',
    },
  },
  {
    id: 4,
    prefix: 'AAD',
    type: 'PASSENGER',
    vehicleStatus: 'DISABLED',
    model: {
      id: 4,
      modelName: 'Celta',
      brandName: 'Fiat',
    },
  },
*/
])

const search_filter = ref('')
const brand_filter = ref('')
const type_filter = ref('')
const status_filter = ref('')

async function loadAll() {
  loading.value = true

  try {
    records.value = await vehicleService.list()

    /* Returns a JSON list in the following format:
    {
      "id": 0,
      "prefix": "string",
      "type": "UTILITY",
      "vehicleStatus": "ACTIVE",
      "model": {
        "id": 0,
        "modelName": "string",
        "brandName": "string"
      }
    }
    */
  } catch (error) {
    console.error('Error: ' + error)
  } finally {
    loading.value = false
  }
}

function refineWord(word) {
  switch (word) {
    case 'UTILITY':
      word = 'UTILITY'
      break

    case 'AVAILABLE':
      word = 'AVAILABLE'
      break

    case 'MAINTENANCE':
      word = 'MAINTENANCE'
      break
  }

  word = word.replace('_', ' ')
  word = word.toLowerCase()

  return word[0].toUpperCase() + word.substring(1)
}

const filteredRecords = computed(() => {
  return records.value.filter((r) => {
    const findSearch =
      !search_filter.value ||
      r.prefix.toLowerCase().includes(search_filter.value.toLowerCase())

    const findStatus =
      !status_filter.value || r.vehicleStatus === status_filter.value

    const findType =
      !type_filter.value || r.type === type_filter.value

    const findBrand =
      !brand_filter.value ||
      r.model.brandName.toLowerCase().includes(brand_filter.value.toLowerCase())

    return findStatus && findSearch && findBrand && findType
  })
})

onMounted(() => loadAll())
</script>

<template>
  <div class="container">
    <div class="searchHeader">
      <div class="searchBar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
          height="20"
          width="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input type="search" placeholder="Search by prefix" v-model="search_filter" />
      </div>

      <div
        style="width: 1px; height: max(100%); border-left: 1px solid #cccc; margin: 0 10px 0 10px"
      />

      <select v-model="type_filter">
        <option value="">Type</option>
        <option value="UTILITY">Utility</option>
        <option value="PASSENGER">Passenger</option>
      </select>

      <select v-model="status_filter">
        <option value="">Status</option>
        <option value="AVAILABLE">Available</option>
        <option value="MAINTENANCE">Maintenance</option>
        <option value="IN_USE">In use</option>
        <option value="DISABLED">Disabled</option>
      </select>
    </div>

    <p style="align-self: center" v-if="filteredRecords.length === 0">
      No information
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Prefix</th>
          <th>Model</th>
          <th>Type</th>
          <th>Fuel</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="reg in filteredRecords" :key="reg.id">
          <td>{{ reg.prefix }}</td>

          <td>{{ reg.model.brandName }} {{ reg.model.modelName }}</td>

          <td>{{ refineWord(reg.type) }}</td>

          <td>(Fuel)</td>

          <td>
            <div :class="reg.vehicleStatus">
              {{ refineWord(reg.vehicleStatus) }}
            </div>
          </td>

          <td>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.container {
  width: 100%;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.searchHeader {
  display: flex;
  height: 25px;
  margin-bottom: 10px;
}

.searchBar {
  display: flex;
  align-items: center;
}

.searchBar svg {
  background-color: #f4f6f9;
  border-radius: 5px 0 0 5px;
  cursor: default;
}

.searchBar input {
  width: 150px;
  background-color: #f4f6f9;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  height: 100%;
}

.searchBar input:focus {
  outline: none;
}

select {
  border: 2px solid #003366;
  color: #003366;
  border-radius: 15px;
  margin: 0 10px 0 10px;
}

table {
  width: 100%;
}

th,
td {
  text-align: center;
  vertical-align: center;
  height: 30px;
}

/* Status tags */
th:nth-child(1) {
  width: max(200px);
}

/* Status tags */
th:nth-child(2) {
  width: max(200px);
}

/* Status tags */
th:nth-child(3) {
  width: max(200px);
}

/* Status tags */
th:nth-child(4) {
  width: max(200px);
}

/* Status tags */
td:nth-child(5) {
  width: max(100px);
}

td:nth-child(5) div {
  border-radius: 10px;
  width: 100px;
}

.AVAILABLE {
  background-color: #ebf9f1;
  color: #1f9254;
}

.IN_USE,
.MAINTENANCE {
  background-color: #fef2e5;
  color: #cd6200;
}

.DISABLED {
  background-color: #fbe7e8;
  color: #a30d11;
}

/* Edit icon */
td:nth-child(6) {
  color: #624de3;
  padding-top: 2px;
}

svg {
  cursor: pointer;
}
</style>
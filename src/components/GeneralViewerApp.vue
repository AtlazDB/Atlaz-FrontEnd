<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { abastecimentoService } from '@/services/abastecimentoService.js'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'

const registros = ref([])
const carregando = ref(true)
const activeCategory = ref('all')

const props = defineProps(['filtro'])
const registrosFiltrados = computed(() => {
  let lista = registros.value

  // filtro de categoria
  if (activeCategory.value !== 'all') {
    lista = lista.filter((r) => r.tipo === activeCategory.value)
  }

  // filtro de mês/ano
  if (!props.filtro) return lista

  return lista.filter((reg) => {
    const dataISO = reg.tipo === 'os' ? reg.os?.departureDate : reg.refueling?.dateTime
    if (!dataISO) return false
    const data = new Date(dataISO)
    return data.getMonth() === props.filtro.mes && data.getFullYear() === props.filtro.ano
  })
})

async function carregarTodos() {
  carregando.value = true
  try {
    const [ordens, abastecimentos] = await Promise.all([
      ordemDeServicoService.listar(),
      abastecimentoService.listar(),
    ])

    // linhas com OS
    const linhasOS = ordens.map((os) => {
      const refueling = abastecimentos.find((a) => a.serviceOrder?.id === os.id)
      return { os, refueling, tipo: 'os' }
    })

    // abastecimentos sem OS vinculada
    const linhasAbastecimento = abastecimentos
      .filter((a) => !a.serviceOrder)
      .map((a) => ({ os: null, refueling: a, tipo: 'abastecimento' }))

    registros.value = [...linhasOS, ...linhasAbastecimento]
  } catch (erro) {
    console.error('Erro: ' + erro)
  } finally {
    carregando.value = false
  }
}

onMounted(() => carregarTodos())

function formatarHora(dataISO) {
  if (!dataISO) return '-'
  const [, hora] = dataISO.split('T')
  return hora.slice(0, 5) // pega só HH:mm
}
function formatarData(dataISO) {
  if (!dataISO) return '-'
  const [data] = dataISO.split('T')
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarValor(valor) {
  if (!valor) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

watch(
  () => props.filtro,
  async (filtro) => {
    if (!filtro) {
      await carregarTodos()
      return
    }
    carregando.value = true
    try {
      const [ordens, abastecimentos] = await Promise.all([
        ordemDeServicoService.listarPorMes(filtro.mes + 1, filtro.ano),
        abastecimentoService.listarPorMes(filtro.mes + 1, filtro.ano),
      ])

      registros.value = [
        ...ordens.map((os) => {
          const refueling = abastecimentos.find((a) => a.serviceOrder?.id === os.id)
          return { os, refueling, tipo: 'os' }
        }),
        ...abastecimentos
          .filter((a) => !a.serviceOrder)
          .map((a) => ({ os: null, refueling: a, tipo: 'abastecimento' })),
      ]
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      carregando.value = false
    }
  },
  { immediate: false },
)
</script>

<template>
  <div class="tabela">
    <button
      v-if="registrosFiltrados.length > 0"
      @click="ordemDeServicoService.exportarCsv(props.filtro?.mes, props.filtro?.ano)"
    >
      Exportar tabela
    </button>
    <div class="category-btns">
      <button
        @click="activeCategory = 'os'"
        class="btn-1"
        :class="{ selected: activeCategory === 'os' }"
      >
        Ocorrências
      </button>
      <button
        @click="activeCategory = 'all'"
        class="btn-2"
        :class="{ selected: activeCategory === 'all' }"
      >
        Todos
      </button>
      <button
        @click="activeCategory = 'abastecimento'"
        class="btn-3"
        :class="{ selected: activeCategory === 'abastecimento' }"
      >
        Abastecimentos
      </button>
    </div>

    <p v-if="carregando">Carregando...</p>

    <table v-else-if="registrosFiltrados.length > 0">
      <thead>
        <tr>
          <th>Viatura</th>

          <th v-if="activeCategory !== 'abastecimento'">Ocorrência</th>
          <th v-if="activeCategory !== 'abastecimento'">Justificativa</th>
          <th v-if="activeCategory !== 'abastecimento'">Requisitante</th>
          <th v-if="activeCategory !== 'abastecimento'">Destino</th>
          <th v-if="activeCategory !== 'abastecimento'">KM de saída</th>
          <th v-if="activeCategory !== 'abastecimento'">KM de chegada</th>
          <th v-if="activeCategory !== 'abastecimento'">Horário saída</th>
          <th v-if="activeCategory !== 'abastecimento'">Horário chegada</th>
          <th v-if="activeCategory !== 'abastecimento'">Data saída</th>
          <th v-if="activeCategory !== 'abastecimento'">Data chegada</th>
          <!-- Abastecimento -->
          <th v-if="activeCategory !== 'os'">Litros</th>
          <th v-if="activeCategory !== 'os'">Valor</th>
          <th v-if="activeCategory !== 'os'">Nota fiscal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reg, i) in registrosFiltrados" :key="i">
          <td>
            {{
              reg.tipo === 'os'
                ? `${reg.os.vehicle.prefix} - ${reg.os.vehicle.model.modelName}`
                : reg.refueling?.vehicle?.prefix
            }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.tipo === 'os' ? reg.os.serviceType : 'Abastecimento' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.os?.justification ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.os?.requester ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.os?.destinationLocation ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.os?.departureKm ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ reg.os?.arrivalKm ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{
              reg.tipo === 'os'
                ? formatarHora(reg.os.departureDate)
                : formatarHora(reg.refueling?.dateTime)
            }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ formatarHora(reg.os?.returnDate) }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{
              reg.tipo === 'os'
                ? formatarData(reg.os.departureDate)
                : formatarData(reg.refueling?.dateTime)
            }}
          </td>
          <td v-if="activeCategory !== 'abastecimento'">
            {{ formatarData(reg.os?.returnDate) }}
          </td>
          <!-- Abastecimento -->
          <td v-if="activeCategory !== 'os'">
            {{ reg.refueling?.liters ?? '-' }}
          </td>
          <td v-if="activeCategory !== 'os'">
            {{ reg.refueling ? formatarValor(reg.refueling.totalValue) : '-' }}
          </td>
          <td v-if="activeCategory !== 'os'">
            {{ reg.refueling?.receiptNumber ?? '-' }}
          </td>
        </tr>
      </tbody>
    </table>

    <p class="info" v-else>Sem informação</p>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.tabela {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
}
.category-btns {
  align-self: center;
  display: flex;
  gap: 2px;
}
.btn-1,
.btn-2,
.btn-3 {
  display: flex;
  margin: 10px 0 0 0;
  width: 120px;
  height: 30px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  opacity: 0.6;
}
.btn-1:hover,
.btn-2:hover,
.btn-3:hover {
  opacity: 1;
}
.btn-1.selected,
.btn-2.selected,
.btn-3.selected {
  opacity: 1;
}
.btn-1 {
  border-radius: 10px 0 0 10px;
}
.btn-2 {
  border-radius: 0;
}
.btn-3 {
  border-radius: 0 10px 10px 0;
}

.info {
  align-self: center;
}
button {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  background-color: #003366;
  color: #ffffff;
  width: fit-content;
  cursor: pointer;
}
table {
  margin-top: 20px;
  border-collapse: collapse;
  max-width: 100%;
  table-layout: fixed;
}
td,
th {
  border: 1px solid #ddd;
  font-size: 11px;
  padding-right: 2px;
  padding-left: 2px;
}
th:nth-child(6),
th:nth-child(7) {
  max-width: 55px;
}
td {
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  text-align: center;
}
tbody tr:hover td {
  background-color: #7aa6cc;
  transition: 0.1s;
}
</style>

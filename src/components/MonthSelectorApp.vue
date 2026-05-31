<script setup>
import { ref, onMounted, watch } from 'vue'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(null)
const emit = defineEmits(['data_selecionada'])
const selecionado = ref(null)

const itens_seletor = ref([])

const isOpen = ref(false)
defineExpose({ open: () => isOpen.value = true })

const mesesNome = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
onMounted(async () => {
  try {
    const ordens = await ordemDeServicoService.listar()

    const vistos = new Set()
    const itens = []

    ordens.forEach((os) => {
      const data = new Date(os.departureDate)
      const mes = data.getMonth()
      const ano = data.getFullYear()
      const chave = `${mes}-${ano}`

      if (!vistos.has(chave)) {
        vistos.add(chave)
        itens.push({ titulo: mesesNome[mes], mes, ano })
      }
    })

    itens.sort((a, b) => a.ano - b.ano || a.mes - b.mes)
    itens_seletor.value = itens
  } catch (erro) {
    console.error('Erro ao carregar meses:', erro)
  }
})

watch(date, (valor) => {
  if (!valor) return
  emit('data_selecionada', { dataInicio: valor[0], dataFim: valor[1] })
  selecionado.value = null // desseleciona o card de mês
})
</script>

<template>
  <div v-if="isOpen" class="overlay" @click="isOpen = false" />
  <div class="sidebar" :class="{ open: isOpen }">
    <button class="btn-fechar" @click="isOpen = false">✕</button>
    <h1 class="titulo">Datas</h1>
    <p class="sidebar-p">Personalizado</p>
    <VueDatePicker
      v-model="date"
      range
      :enable-time-picker="false"
      select-text="Selecionar"
      cancel-text="Cancelar"
      locale="pt-BR"
    />

    <p class="sidebar-p">Por mês</p>
    <div class="meses">
      <div
        class="card_mes"
        @click="
          () => {
            selecionado = 'todos'
            emit('data_selecionada', null)
          }
        "
        :class="{ ativo: selecionado === 'todos' }"
      >
        <h1>Todos</h1>
      </div>
      <div
        class="card_mes"
        v-for="item in itens_seletor"
        :key="item.titulo + item.ano"
        @click="
          () => {
            selecionado = item.titulo + item.ano
            emit('data_selecionada', { mes: item.mes, ano: item.ano })
          }
        "
        :class="{ ativo: selecionado === item.titulo + item.ano }"
      >
        <h1>{{ item.titulo }}</h1>
        <p>{{ item.ano }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.titulo {
  width: 130px;
  font-size: 24px;
}
.seletor {
  height: 400px;
  width: fit-content;
  max-height: fit-content;
  margin: 20px 10px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
}

.sidebar-p{
  border-bottom: #cccc 1px solid;
  margin-top: 20px;
  margin-bottom: 10px;
}
.meses {
  display: flex;
  flex-direction: column;
  height: 230px;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  margin-top: 10px;
}
.meses:hover {
  overflow-y: auto;
}
.card_mes {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-bottom: 5px;
  width: 100%;
  cursor: pointer;
}
.card_mes:hover {
  color: #003366;
  opacity: 0.7;
}
.card_mes.ativo {
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

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 100;
  padding: 20px;
  overflow: visible;
}

.sidebar.open {
  transform: translateX(0);
}

.btn-fechar {
  align-self: flex-end;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

:deep(.dp__input) {
  height: 30px;
  font-size: 11px;
}
</style>

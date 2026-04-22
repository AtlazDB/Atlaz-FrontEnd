<script setup>
import { ref, onMounted } from 'vue'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'

const emit = defineEmits(['data_selecionada'])
const selecionado = ref(null)
const minimizar = ref(true)
const itens_seletor = ref([])

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
      const data = new Date(os.dataSaida)
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
</script>

<template>
  <div class="seletor" :class="{ fechado: !minimizar }">
    <h1 class="titulo">Datas</h1>
    <!--
  <select>
    <option value="1">2026</option>
    <option value="2">2025</option>
  </select>
  -->
    <div class="meses" v-if="minimizar">
      <div
        class="card_mes"
        v-on:click="
          () => {
            selecionado = 'todos'
            emit('data_selecionada', null)
          }
        "
        v-bind:class="{ ativo: selecionado === 'todos' }"
      >
        <h1>Todos</h1>
      </div>
      <div
        class="card_mes"
        v-for="item in itens_seletor"
        :key="item.titulo + item.ano"
        v-on:click="
          () => {
            selecionado = item.titulo + item.ano
            emit('data_selecionada', { mes: item.mes, ano: item.ano })
          }
        "
        v-bind:class="{ ativo: selecionado === item.titulo + item.ano }"
      >
        <h1>{{ item.titulo }}</h1>
        <p>{{ item.ano }}</p>
      </div>
    </div>
    <button class="minimizador" v-on:click="minimizar = !minimizar">
      <svg width="20" height="20" viewBox="0 0 24 24" :class="{ fechado: !minimizar }">
        <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
      </svg>
    </button>
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
.seletor.fechado {
  position: absolute;
  top: 0;
  right: 0;
}
.minimizador {
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
svg.fechado {
  transform: rotate(-180deg);
}
.meses {
  display: flex;
  flex-direction: column;
  height: 230px;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 130px;
  margin-top: 10px;
}
.meses:hover {
  overflow-y: auto;
}
.card_mes {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-bottom: 5px;
  width: 130px;
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
</style>

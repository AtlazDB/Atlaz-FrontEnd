<script setup>
import { onMounted, ref, computed } from 'vue'
import { viaturaService } from '@/services/viaturaService.js'

const carregando = ref(false)

const registros = ref([])

const busca_filtro = ref('')
const marca_filtro = ref('')
const tipo_filtro = ref('')
const status_filtro = ref('')
const combustivel_filtro = ref('')

const emit = defineEmits(['editar'])

const showInfo = ref(false)
const viaturaInfo = ref(null)

const showAviso = ref(false)
const avisoInfo = ref(null)

async function carregarTodos() {
  carregando.value = true
  try {
   registros.value = await viaturaService.listar()

    /*Retorna uma lista JSON da seguinte forma:
    {
      "id": 0,
      "prefix": "string",
      "brand": "string",
      "model": "string",
      "type": "UTILITARIO",
      "status": "DISPONIVEL",
      "fuelType": "GASOLINA",
      "km": 0.1
    }
    */
  } catch (erro) {
    console.error('Erro: ' + erro)
  } finally {
    carregando.value = false
  }
};

function refinarPalavra(palavra) {
  switch (palavra) {
    case 'UTILITARIO':
      palavra = 'UTILITÁRIO'
      break
    case 'DISPONIVEL':
      palavra = 'DISPONÍVEL'
      break
    case 'MANUTENCAO':
      palavra = 'MANUTENÇÃO'
      break
    case 'GNV': //É uma sigla
      return 'GNV'
  }
  palavra = palavra.replace('_', ' ')
  palavra = palavra.toLowerCase()
  return palavra[0].toUpperCase() + palavra.substring(1)
}

const registrosFiltrados = computed(() => {
  return registros.value.filter((r) => {
    const encontrarBusca =
      !busca_filtro.value || r.prefix.toLowerCase().includes(busca_filtro.value.toLowerCase())

    const encontrarStatus = !status_filtro.value || r.status === status_filtro.value
    // Impossibilita que o usuário visualize viaturas com a tag DESATIVADA, a não ser que ele selecione ela no filtro.
    const ocultarStatus = status_filtro.value === 'DESATIVADA' || r.status !== 'DESATIVADA'

    const encontrarTipo = !tipo_filtro.value || r.type === tipo_filtro.value

    const encontrarMarca =
      !marca_filtro.value || r.brand.toLowerCase().includes(marca_filtro.value.toLowerCase())

    const encontrarCombustivel =
      !combustivel_filtro.value || r.fuelType === combustivel_filtro.value

    return (
      encontrarStatus &&
      encontrarBusca &&
      encontrarMarca &&
      encontrarTipo &&
      encontrarCombustivel &&
      ocultarStatus
    )
  })
})
function openInfo(viatura) {
  viaturaInfo.value = viatura
  showInfo.value = true
}

function closeInfo() {
  showInfo.value = false
  viaturaInfo.value = null
}
function edit(viatura) {
  emit('editar', viatura, 'edicao')
}

function precisaManutencao(km) {
  return km >= 10000
}

function openAviso(viatura) {
  avisoInfo.value = viatura
  showAviso.value = true
}

function closeAviso() {
  showAviso.value = false
  avisoInfo.value = null
}

onMounted(() => carregarTodos())
defineExpose({ carregarTodos })
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
        <input type="search" placeholder="Buscar pelo prefixo" v-model="busca_filtro" />
      </div>
      <div
        style="width: 1px; height: max(100%); border-left: 1px solid #cccc; margin: 0 10px 0 10px"
      />
      <select v-model="tipo_filtro">
        <option value="" selected>Tipo</option>
        <option value="UTILITARIO">Utilitário</option>
        <option value="PASSEIO">Passeio</option>
      </select>
      <select v-model="status_filtro">
        <option value="" selected>Status</option>
        <option value="DISPONIVEL">Disponível</option>
        <option value="MANUTENCAO">Manutenção</option>
        <option value="EM_USO">Em uso</option>
        <option value="DESATIVADA">Desativada</option>
      </select>
      <select v-model="combustivel_filtro">
        <option value="" selected>Combustível</option>
        <option value="DIESEL">Diesel</option>
        <option value="ETANOL">Etanol</option>
        <option value="GASOLINA">Gasolina</option>
        <option value="GNV">GNV</option>
        <option value="FLEX">Flex</option>
      </select>
    </div>
    <p style="align-self: center" v-if="registrosFiltrados.length === 0">Sem informação</p>
    <table v-else>
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Modelo</th>
          <th>Status</th>
          <th>Mais Informações</th>
          <th>Avisos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in registrosFiltrados" :key="reg.id">
          <td>{{ reg.prefix }}</td>
          <td>{{ reg.brand }} {{ reg.model }}</td>

          <td>
             <span class="status-color" :class="reg.status"></span>
          </td>

          <td>
            <span class="more-info-btn" @click="openInfo(reg)">•••</span>
          </td>

          <td>
            <div
              class="warning-btn"
              :class="{ ativo: precisaManutencao(reg.km) }"
              @click="openAviso(reg)"
            >
              !
            </div>
          </td>

        <!--<td>
            <div class="editar-btn">
              <svg
                @click="edit(reg)"
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
            </div>
          </td>-->
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="showInfo" class="overlay" @click="closeInfo">
    <div class="modal-info" @click.stop>
      <h3 class="modal-title">Informações da Viatura</h3>

      <div class="info-line">
        <span class="info-label">Prefixo</span>
        <span class="info-value">{{ viaturaInfo.prefix }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Tipo</span>
        <span class="info-value">{{ refinarPalavra(viaturaInfo.type) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Combustível</span>
        <span class="info-value">{{ refinarPalavra(viaturaInfo.fuelType) }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">Quilometragem</span>
        <span class="info-value">{{ viaturaInfo.km }} km</span>
      </div>
       <button class="btn-edit" @click="() => { edit(viaturaInfo); closeInfo() }">Editar</button>
      <button class="btn-close" @click="closeInfo">X</button>
      </div>
    </div>

    <div v-if="showAviso" class="overlay" @click="closeAviso">
      <div class="modal-info" @click.stop>
        <h3 class="modal-title">Avisos da Viatura</h3>

        <div v-if="precisaManutencao(avisoInfo.km)" class="info-line">
          <span class="info-label">Manutenção preventiva</span>
          <span class="info-value">
            Viatura atingiu {{ avisoInfo.km }} km.
            Necessária manutenção.
          </span>
        </div>

        <div v-else class="info-line">
          <span class="info-value">
            Nenhum aviso disponível.
          </span>
        </div>

        <button class="btn-close" @click="closeAviso">X</button>
      </div>
    </div>
</template>

<style scoped>
@import '@/assets/style.css';

.container {
  width: 80%;
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
  width: 160px;
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

  margin: 0 auto;
}
th,
td {
  text-align: center;
  vertical-align: middle;
  height: 40px;
}
/*Prefixo, modelo, tipo, combustível, quilometragem*/
th:nth-child(1),
th:nth-child(2),
th:nth-child(3),
th:nth-child(4),
th:nth-child(5) {
  width: max(200px);
}
/*Tags de status*/
.status-color{
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.DISPONIVEL {
 background-color: #abf5cb;
  color: #0ae972;
}
.EM_USO {
background-color: #ffc78a;
  color: #cd6200;
}

.MANUTENCAO{
  background-color: #fc887f;
  color: #cd6200;
}
.DESATIVADA {
  background-color: #fa6d74;
  color: #a30d11;
}

/*Ícone de editar*/
.more-info-btn {
  color: #624de3;
  padding-top: 2px;
  width: 100px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-info{
  background: white;
  border-radius: 12% ;
  padding: 40px;
  width: 400px;
  position: relative;
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-title{
  color:#003366;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}

.info-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.info-value {
  color: #222;
  font-size: 14px;
}

.btn-edit {
  width: 100%;
  padding: 14px;
  background-color: #003366;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 15px;
}

.btn-close{
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
}
svg {
  cursor: pointer;
}

.warning-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.warning-btn:hover {
  transform: scale(1.1);
}

.warning-btn.ativo {
  background-color: #ff0000;
}
</style>

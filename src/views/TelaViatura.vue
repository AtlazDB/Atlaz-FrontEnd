<script setup>
import Sidebar from '@/views/Sidebar.vue'
import AppVisualizadorViatura from '@/components/AppVisualizadorViatura.vue'
import { viaturaService } from '@/services/viaturaService.js'
import { modelService } from '@/services/modelService.js'


import { ref, onMounted } from 'vue'

const showForm = ref(false)

const vehicle = ref({
  id: 0,
  prefix: '',
  brand: '',
  model: '',
  type: 'UTILITARIO',
  status: 'DISPONIVEL',
  fuelType: 'GASOLINA',
  km: 0,
})
const id = ref(0)
const prefixo = ref('')
const tipo = ref('')
const modelId = ref(null)
const modelos = ref([])
const combustivel = ref('')
const quilometragem = ref('')
const quilometragemRaw = ref(null)
const status = ref('')
const tipoAlteracao = ref('')

const erros = ref({})

const showNovoModelo = ref(false)
const novoModeloNome = ref('')
const novoModeloMarca = ref('')

function maskQuilometragem(event) {
  const raw = event.target.value.replace(/\D/g, '').slice(0, 9)
  quilometragemRaw.value = raw === '' ? null : parseInt(raw, 10)

  const formatted = raw === '' ? '' : parseInt(raw, 10).toLocaleString('pt-BR')
  quilometragem.value = formatted
  event.target.value = formatted
}

function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function maskModeloNome(event) {
  const val = capitalize(event.target.value)
  novoModeloNome.value = val
  event.target.value = val
}

function maskModeloMarca(event) {
  const val = capitalize(event.target.value)
  novoModeloMarca.value = val
  event.target.value = val
}

async function cadastrarModelo() {
  if (!novoModeloNome.value.trim() || !novoModeloMarca.value.trim()) {
    alert('Preencha marca e modelo')
    return
  }
  try {
    await modelService.criar({
      nameModel: novoModeloNome.value,
      nameBrand: novoModeloMarca.value,
    })
    modelos.value = await modelService.listar()
    showNovoModelo.value = false
    novoModeloNome.value = ''
    novoModeloMarca.value = ''
  } catch (e) {
    console.log(e)
  }
}

//Padrão para cadastro
function openForm(dados = null, tipoAlt = 'cadastro') {
  //Reset dos dados
  erros.value = {}
  id.value = 0
  prefixo.value = ''
  tipo.value = 'UTILITARIO'
  modelId.value = dados?.modelId ?? null
  combustivel.value = 'GASOLINA'
  quilometragem.value = ''
  quilometragemRaw.value = 0
  status.value = 'DISPONIVEL'

  //Caso seja uma edição atribui os dados passados
  if (dados != null) {
    id.value = dados.id
    prefixo.value =  dados.prefix
    tipo.value = dados.type
    combustivel.value = dados.fuelType
    quilometragemRaw.value = dados.km
    quilometragem.value = dados.km != null
    ? parseInt(dados.km, 10).toLocaleString('pt-BR')
      : ''
    status.value = dados.status
  }
  tipoAlteracao.value = tipoAlt
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function validateForm() {
  const e = {}

  //Verifica se todos os valores foram preenchidos
  if (!prefixo.value?.trim()) e.prefixo = true
  if (!tipo.value) e.tipo = true
  if (!combustivel.value) e.combustivel = true
  if (quilometragemRaw.value === '' || quilometragemRaw.value === null) e.quilometragem = true
  if (!status.value) e.status = true

  erros.value = e
  console.log('erros:', erros.value)
  return Object.keys(e).length === 0 // true = sem erros
}
const visualizador = ref(null)
async function submitForm() {
  if (!validateForm()) {
    alert('Todos os campos precisam ser preenchidos')
    return
  }
  vehicle.value = {
    id: id.value,
    prefix: prefixo.value,
    modelId: modelId.value,
    type: tipo.value,
    status: status.value,
    fuelType: combustivel.value,
    km: quilometragemRaw.value
  }
    //Caso seja um cadastro
    if (tipoAlteracao.value === 'cadastro') {
      await criarViatura(vehicle.value)
    } else if (tipoAlteracao.value === 'edicao') {
      await editarViatura(vehicle.value)
    }
    closeForm()
    await visualizador.value.carregarTodos()
}

async function criarViatura(viatura) {
  try {
    await viaturaService.criar(viatura)
  } catch (e) {
    console.log(e)
  }
}

 onMounted(async () => {
  modelos.value = await modelService.listar()
  })

async function editarViatura(viatura) {
  try {
    console.log('Enviando para edição: ', viatura)
    await viaturaService.atualizar(viatura.id, viatura)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="tela">
    <Sidebar nome="ADMIN" cargo="Administrador" userType="admin" @openForm="actionForm" />
    <router-view />
    <div class="componente">
      <h1 class="titulo">Viaturas</h1>
      <div class="visualizadorViatura">
       <!-- <button class="btn-cadastrar" @click="openForm()">Cadastrar nova viatura</button>-->
      <AppVisualizadorViatura
      ref="visualizador"
      @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
      @abrirModal="openForm()"
      />
        <!-- chama a função com o parâmetro -->
      </div>
    </div>
  </div>

  <div v-if="showForm" class="overlay" @click="closeForm">
    <div class="modal" @click.stop>
      <h2 class="titulo-modal">Cadastrar nova Viatura</h2>

      <div class="linha">
        <div class="campo">
          <label>Prefixo da Viatura</label>
          <input type="text" v-model="prefixo" :class="{ erro: erros.prefixo }" />
        </div>

        <div class="campo">
          <label>Tipo de uso</label>
          <div class="select-wrapper">
            <select v-model="tipo" :class="{ erro: erros.tipo }">
              <option disabled value="">Selecione...</option>
              <option value="UTILITARIO">Utilitário</option>
              <option value="PASSEIO">Passeio</option>
            </select>
          </div>
        </div>
      </div>

    <div class="campo">
      <label>Modelo</label>
      <div class="select-wrapper">
        <select v-model="modelId" :class="{ erro: erros.modelId }">
          <option disabled :value="null">Selecione...</option>
          <option v-for="m in modelos" :key="m.id" :value="m.id">
            {{ m.brandName }} {{ m.modelName }}
          </option>
        </select>
      </div>

    <button
      type="button"
      class="btn-novo-modelo"
      @click="showNovoModelo = !showNovoModelo">
      + Cadastrar novo modelo
    </button>

    <div v-if="showNovoModelo" class="novo-modelo-form">

    <div class="campo-modelo">
      <label>Marca</label>
      <input
        type="text"
        v-model="novoModeloMarca"
        placeholder="Ex: Chevrolet"
      />
    </div>

    <div class="campo-modelo">
      <label>Modelo</label>
      <input
        type="text"
        v-model="novoModeloNome"
        placeholder="Ex: Prisma"
      />
    </div>

    <button
      type="button"
      class="btn-salvar-modelo"
      @click="cadastrarModelo"
    >
      Salvar modelo
    </button>

  </div>
</div>

      <div class="campo">
        <label>Tipo de combustível</label>
        <div class="select-wrapper">
          <select v-model="combustivel" :class="{ erro: erros.combustivel }">
            <option disabled value="">Selecione...</option>
            <option value="DIESEL">Diesel</option>
            <option value="ETANOL">Etanol</option>
            <option value="GASOLINA">Gasolina</option>
            <option value="GNV">GNV</option>
            <option value="FLEX">Flex</option>
          </select>
        </div>
      </div>

      <div class="campo">
        <label>Quilometragem do veículo</label>
        <input type="text"
         inputmode="numeric"
         :value="quilometragem"
         @input="maskQuilometragem"
         placeholder="Ex: 12.500"
         :class="{ erro: erros.quilometragem }" />
      </div>

      <div class="campo">
        <label>Status do veículo</label>
        <div class="select-wrapper">
          <select v-model="status" :class="{ erro: erros.status }">
            <option disabled value="">Selecione...</option>
            <option value="DISPONIVEL">Disponível</option>
            <option value="EM_USO">Em uso</option>
            <option value="MANUTENCAO">Manutenção</option>
            <option value="DESATIVADA">Desativada</option>
          </select>
        </div>
      </div>

      <button type="button" class="btn-enviar" @click="submitForm()">Enviar</button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.titulo {
  font-size: 24px;
  color: #003366;
  border-left: 4px solid #003366;
  padding-left: 10px;
  margin-top: 45px;
}

.visualizadorViatura {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

button {
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 7px;
  margin-bottom: 30px;
}

.novo-modelo-form {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-top: 10px;
  flex-wrap: wrap;
}

.campo-modelo {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
}

.campo-modelo input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #003366;
  outline: none;
}

.btn-salvar-modelo {
  height: 40px;
  padding: 0 16px;
  margin-bottom: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: max(100%);
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 16px;
  box-sizing: border-box;
}

.modal {
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.titulo-modal {
  font-size: 18px;
  color: #003366;
  border-left: 4px solid #003366;
  padding-left: 10px;
}

.linha {
  display: flex;
  gap: 10px;
}
.linha .campo {
  width: 50%;
}
.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.campo label {
  font-size: 13px;
  color: #333;
}

.campo input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #6a5acd;
  outline: none;
  background: #fff;
}

.campo input:focus {
  border-color: #003366;
}
.campo input.erro,
.campo select.erro {
  border-color: #ff0000;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #003366;
  background: #fff;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #003366;
  pointer-events: none;
}

.btn-enviar {
  margin-top: 20px;
  align-self: center;
  background: #003366;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 20px;
  cursor: pointer;
}

.btn-enviar:hover {
  background: #002244;
}

@media (max-width: 600px) {
  .modal {
    padding: 20px 18px;
    gap: 10px;
    border-radius: 14px;
    max-height: 85vh;
  }

  .linha {
    flex-direction: column;
  }

  .linha .campo {
    width: 100%;
  }

  .titulo-modal {
    font-size: 16px;
  }

  .novo-modelo-form {
    flex-direction: column;
    gap: 8px;
  }

  .campo-modelo {
    min-width: unset;
    width: 100%;
  }

  .btn-enviar {
    width: 100%;
    padding: 12px;
  }
}
</style>

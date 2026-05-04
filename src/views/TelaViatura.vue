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
const quilometragem = ref(0)
const status = ref('')
const tipoAlteracao = ref('')

const erros = ref({})

const showNovoModelo = ref(false)
const novoModeloNome = ref('')
const novoModeloMarca = ref('')

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
  quilometragem.value = 0
  status.value = 'DISPONIVEL'

  //Caso seja uma edição atribui os dados passados
  if (dados != null) {
    id.value = dados.id
    prefixo.value = dados.prefix
    tipo.value = dados.type
    combustivel.value = dados.fuelType
    quilometragem.value = dados.km
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
  if (quilometragem.value === '') e.quilometragem = true
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
    km: quilometragem.value,
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
      <h1 class="titulo">Viaturas cadastradas</h1>
      <div class="visualizadorViatura">
        <button @click="openForm()">Cadastrar nova viatura</button>
      <AppVisualizadorViatura
      ref="visualizador"
      @editar="(dados, tipoAlt) => openForm(dados, tipoAlt)"
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
      <button type="button" class="btn-novo-modelo" @click="showNovoModelo = !showNovoModelo">
        + Cadastrar novo modelo
      </button>
      <div v-if="showNovoModelo" class="novo-modelo-form">
        <input type="text" v-model="novoModeloMarca" placeholder="Marca (ex: Chevrolet)" />
        <input type="text" v-model="novoModeloNome" placeholder="Modelo (ex: Prisma)" />
        <button type="button" @click="cadastrarModelo">Salvar</button>
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
        <input type="number" v-model="quilometragem" :class="{ erro: erros.quilometragem }" />
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

.visualizadorViatura {
  width: max(100%);
  padding: 10px;
}
button {
  background-color: #7aa6cc;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 7px;
  margin-bottom: 30px;
}
button:hover {
  background-color: #457aad;
}
button:active {
  transform: scale(0.95);
  transition-duration: 0.1s;
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
}

.modal {
  min-height: 520px;
  width: 90%;
  max-width: 700px;
  background: #f8f9fb;
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
  border-color: #2f12d1;
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
  border: 1px solid #6a5acd;
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
  color: #6a5acd;
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
</style>

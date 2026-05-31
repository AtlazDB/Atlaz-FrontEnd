<script setup>
import { ref, onMounted } from 'vue'
import { viaturaService } from '@/services/viaturaService.js'
import { modelService } from '@/services/modelService.js'
import PlusIcon from '@/assets/icons/PlusIcon.vue'

// Emite ao pai para atualizar ou fechar o form
const emit = defineEmits(['close', 'saved'])

// Estado interno do formulário
const id = ref(0)
const prefixo = ref('')
const tipo = ref('UTILITARIO')
const modelId = ref(null)
const models = ref([])
const combustivel = ref('GASOLINA')
const quilometragem = ref(0)
const status = ref('DISPONIVEL')
const tipoAlteracao = ref('cadastro')
const erros = ref({})
const showNovoModelo = ref(false)
const novoModeloNome = ref('')
const novoModeloMarca = ref('')

const carregando = ref(false)

const statusListReg = ref([])
const statusListEdit = ref([])

// Expõe openForm para o pai chamar via ref
defineExpose({ openForm, formatWord })

// -- Funções

async function loadApi() {
  try {
    statusListEdit.value = await viaturaService.statusValues()
    // Retira essas opções para quando for cadastro
    const filter = ['DESATIVADA', 'EM USO']
    statusListReg.value = statusListEdit.value.filter((item) => !filter.includes(item))

    models.value = await modelService.listar()
    /* Retorna um JSON da seguinte forma:
     * [
     *   {
     *     id: 0
     *     brandName: ''
     *     modelName: ''
     *   }
     * ]
     * */
  } catch (e) {
    console.log(e)
    // Valores pré-definidos
    statusListEdit.value = ['DISPONIVEL', 'EM USO', 'MANUTENCAO', 'DESATIVADA']
    statusListReg.value = ['DISPONIVEL', 'MANUTENCAO']
    console.log(statusListEdit.value)
  }
}
function formatWord(word) {
  const map = {
    UTILITARIO: 'Utilitário',
    DISPONIVEL: 'Disponível',
    MANUTENCAO: 'Manutenção',
    EM_USO: 'Em uso',
    GNV: 'GNV',
  }

  if (map[word]) return map[word]

  return word
    .replace('_', ' ')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
}

async function openForm(dados = null, altType = 'cadastro') {
  models.value = await modelService.listar()
  erros.value = {}
  id.value = dados?.id ?? 0
  prefixo.value = dados?.prefix ?? ''
  tipo.value = dados?.type ?? 'UTILITARIO'
  modelId.value = dados?.modelId ?? null
  combustivel.value = dados?.fuelType ?? 'GASOLINA'
  quilometragem.value = dados?.km ?? 0
  status.value = dados?.status ?? 'DISPONIVEL'
  tipoAlteracao.value = altType
}

function closeForm() {
  emit('close')
}

function validateForm() {
  const e = {}
  if (!prefixo.value?.trim()) e.prefixo = true
  if (!tipo.value) e.tipo = true
  if (!modelId.value) e.modelId = true
  if (!combustivel.value) e.combustivel = true
  if (quilometragem.value === '') e.quilometragem = true
  if (!status.value) e.status = true
  erros.value = e
  return Object.keys(e).length === 0
}

async function submitForm() {
  // Para desabilitar o botão de envio
  carregando.value = true
  if (!validateForm()) {
    alert('Todos os campos precisam ser preenchidos')
    carregando.value = false
    return
  }
  const viatura = {
    id: id.value,
    prefix: prefixo.value,
    modelId: modelId.value,
    type: tipo.value,
    status: status.value,
    fuelType: combustivel.value,
    km: quilometragem.value,
  }
  console.log('ok')
  try {
    if (tipoAlteracao.value === 'cadastro') {
      await viaturaService.criar(viatura)
    } else if (tipoAlteracao.value === 'edicao') {
      console.log('okok')
      await viaturaService.atualizar(viatura.id, viatura)
    }
    console.log('okokok')
    emit('saved') // avisa o pai para recarregar a lista
    closeForm()
  } catch (e) {
    console.log(e)
    carregando.value = false
  }
  carregando.value = false
}

async function cadastrarModelo() {
  carregando.value = true
  if (!novoModeloNome.value.trim() || !novoModeloMarca.value.trim()) {
    alert('Preencha marca e modelo')
    carregando.value = false
    return
  }
  try {
    await modelService.criar({
      nameModel: novoModeloNome.value,
      nameBrand: novoModeloMarca.value,
    })
    models.value = await modelService.listar()
    showNovoModelo.value = false
    novoModeloNome.value = ''
    novoModeloMarca.value = ''
  } catch (e) {
    console.log(e)
    carregando.value = false
  }
  carregando.value = false
}

onMounted(async () => {
  await loadApi()
})
</script>

<template>
  <div class="overlay" @click="closeForm">
    <div class="modal" @click.stop>
      <h1 class="titulo">
        {{ tipoAlteracao === 'cadastro' ? 'Cadastrar nova Viatura' : 'Editar Viatura' }}
      </h1>

      <div class="linha">
        <div class="campo">
          <label>Prefixo da viatura</label>
          <input class="ipt-field" :class="{ erro: erros.prefixo }" type="text" v-model="prefixo" />
        </div>

        <div class="campo">
          <label>Tipo de uso</label>
          <div class="select-wrapper">
            <select class="sct-field" :class="{ erro: erros.tipo }" v-model="tipo">
              <option disabled value="">Selecione...</option>
              <option value="UTILITARIO">Utilitário</option>
              <option value="PASSEIO">Passeio</option>
            </select>
          </div>
        </div>
      </div>
      <div class="campo">
        <label>Modelo</label>
        <div style="display: flex">
          <div class="select-wrapper" style="display: flex; width: max(100%)">
            <select
              class="sct-field"
              v-model="modelId"
              :class="{ erro: erros.modelId }"
              style="border-radius: 10px 0 0 10px"
            >
              <option disabled :value="null">Selecione...</option>
              <option v-for="m in models" :key="m.id" :value="m.id">
                {{ m.brandName }} {{ m.modelName }}
              </option>
            </select>
          </div>
          <button
            class="btn-primary add"
            :class="{ ativo: showNovoModelo }"
            type="button"
            @click="showNovoModelo = !showNovoModelo"
            style="border-radius: 0 10px 10px 0"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div v-if="showNovoModelo" class="linha" style="gap: 0">
        <input
          class="ipt-field"
          type="text"
          v-model="novoModeloMarca"
          placeholder="Marca (ex: Chevrolet)"
          style="border-radius: 10px 0 0 10px; width: max(50%)"
        />
        <input
          class="ipt-field"
          type="text"
          v-model="novoModeloNome"
          placeholder="Modelo (ex: Prisma)"
          style="border-radius: 0 10px 10px 0; width: max(50%)"
        />
        <button
          class="btn-primary"
          type="button"
          :disabled="carregando"
          @click="cadastrarModelo"
          style="margin-left: 5px"
        >
          Salvar
        </button>
      </div>

      <div class="campo">
        <label>Tipo de combustível</label>
        <div class="select-wrapper">
          <select class="sct-field" v-model="combustivel">
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
        <input class="ipt-field" type="number" v-model="quilometragem" />
      </div>

      <div class="campo">
        <label>Status do veículo</label>
        <div class="select-wrapper">
          <select
            class="sct-field"
            :class="{ erro: erros.status }"
            v-if="tipoAlteracao === 'cadastro'"
            v-model="status"
          >
            <option disabled value="">Selecione...</option>
            <option v-for="s in statusListReg" :key="s" :value="s">{{ formatWord(s) }}</option>
          </select>
          <select
            class="sct-field"
            :class="{ erro: erros.status }"
            v-if="tipoAlteracao === 'edicao'"
            v-model="status"
          >
            <option disabled value="">Selecione...</option>
            <option v-for="s in statusListEdit" :key="s" :value="s">{{ formatWord(s) }}</option>
          </select>
        </div>
      </div>

      <button type="button" class="btn-enviar" @click="submitForm" :disabled="carregando">
        Confirmar
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.titulo {
  font-size: 20px;
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
  max-height: 90%;
  width: 90%;
  max-width: 700px;
  background: #f8f9fb;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: min(1vh, 10px);

  overflow-y: auto;
}
.modal::-webkit-scrollbar {
  display: none;
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

.select-wrapper {
  position: relative;
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
  background: #003366;
}

.add svg {
  rotate: 0deg;
  transition: 0.2s;
}

.add.ativo svg {
  rotate: 45deg;
  transition: 0.2s;
}
</style>

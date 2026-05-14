<template>

  <div class="tela">

    <Sidebar :nome="nomeUsuario" cargo="Técnico" userType="tecnico" />
    <div class="main">
    <h1>Historico de Ocorrencias</h1>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Destino</th>
            <th>Data</th>
            <th>Viatura</th>
            <th>Mais informaçoes</th>
          </tr>
      </thead>

    <tbody>
      <tr v-for="registro in registros" :key="registro.id">
            <td>{{ registro.destination }}</td>
            <td>{{ formatarData(registro.dateTime) }}</td>
            <td>{{ registro.vehicle?.prefix }}</td>
            <td>
              <span class="more-info-btn" @click="openInfo">•••</span>
            </td>
      </tr>
    </tbody>
    </table>
  </div>

<div v-if="modalAberto" class="overlay" @click="fecharModal">
  <div class="modal" @click.stop>
    <h2 class="modal-title">Detalhes da Ocorrência</h2>

    <div v-if="registroSelecionado">

      <div class="row">
        <div class="field">
          <label>Tipo de Ocorrência</label>
          <input type="text" :value="registroSelecionado.occurrenceType ?? '-'" disabled />
        </div>

        <div class="field">
          <label>Requisitante</label>
          <input type="text" :value="registroSelecionado.requester ?? '-'" disabled />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>Destino</label>
          <input type="text" :value="registroSelecionado.destination ?? '-'" disabled />
        </div>

        <div class="field">
          <label>Viatura</label>
          <input type="text" :value="registroSelecionao.vehicle?.prefix ?? '-'" disabled />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>Data Saída</label>
          <input type="text" :value="formatarData(registroSelecionado.departureDateTime)" disabled />
        </div>

        <div class="field">
          <label>Hora Saída</label>
          <input type="text" :value="formatarHora(registroSelecionado.departureDateTime)" disabled />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>Data Chegada</label>
          <input type="text" :value="formatarData(registroSelecionado.arrivalDateTime)" disabled />
        </div>

        <div class="field">
          <label>Hora Chegada</label>
          <input type="text" :value="formatarHora(registroSelecionado.arrivalDateTime)" disabled />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>KM Chegada</label>
          <input type="text" :value="registroSelecionado.arrivalKm ?? '-'" disabled />
        </div>

        <div class="field">
          <label>Justificativa</label>
          <input type="text" :value="registroSelecionado.justification ?? '-'" disabled />
        </div>
      </div>

    </div>
      <button type="button" class="btn-close" @click="fecharModal">X</button>
    </div>

  </div>
  </div>
  </div>
</template>

<script setup>
import Sidebar from "@/views/Sidebar.vue";
import { ref, onMounted } from 'vue'

const registros = ref([])
const modalAberto = ref(false)
const registroSelecionado = ref(null)
</script>

<style scoped>
.tela {
  display: flex;
}

.main {
  flex: 1;
  background-color: #f0f2f5;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  color: #003366;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.table {
  width: 100%;
  overflow-x: auto;
  margin-top: 30px;
}

table {
 width: 80%;
 min-width: 400px;
 border-collapse: collapse;
 background: white;
 border-radius: 8px;
 overflow: hidden;
 box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

th, td {
  padding: 12px 16px;
  text-align: left;
}

.more-info-btn {
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 2px;
  color: #6a5acd;
  user-select: none;
}

.more-info-btn:hover {
  color: #6a5acd;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  position: relative;
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

.modal-title {
  font-size: 18px;
  color: #003366;
  padding-left: 10px;
}

.row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.row
.field {
  width: 50%;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 13px;
  color: #333;
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

@media (max-width:600px)  {
  .main {
    padding: 40px 16px;
  }

  .botao-cadastrar {
    width: 100%;
    font-size: 12px;
    padding: 10px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table {
    min-width: unset;
    width: 100%;
  }

  th, td {
    padding: 8px 6px;
    font-size: 11px;
  }
}
</style>

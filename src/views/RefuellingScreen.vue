<template>

    <div class="tela">
     <Sidebar :nome="nomeUsuario" cargo="Técnico" userType="tecnico" />

    <div class="main">
        <h1>Abastecimento</h1>

        <button
            type="button"
            class="botao-cadastrar"
            @click="mostrarFormulario = true">
            Cadastrar novo abastecimento
        </button>

<div v-if="mostrarFormulario" class="overlay">
  <div class="modal">
    <h2>Novo registro</h2>

    <div class="campo">
      <label>Viatura</label>
      <select v-model="form.vehicleId">
        <option value="">Selecione...</option>
        <option v-for="v in viaturas" :key="v.id" :value="v.id">
          {{ v.prefix }} - {{ v.brand }} {{ v.model }}
        </option>
      </select>
    </div>

    <div class="campo">
      <label>Data e Hora</label>
      <input type="datetime-local" v-model="form.dateTimeInput" />
    </div>

    <div class="campo">
      <label>Número da Nota Fiscal</label>
      <input type="text" v-model="form.receiptNumber" />
    </div>

    <div class="campo">
      <label>Litros</label>
      <input type="number" step="0.01" v-model="form.liters" />
    </div>

    <div class="campo">
      <label>Valor Total (R$)</label>
      <input type="number" step="0.01" v-model="form.totalValue" />
    </div>

    <button class="botao-enviar" @click="enviarFormulario">Enviar</button>
    <button class="botao-fechar" @click="mostrarFormulario = false">✕</button>
  </div>
</div>

<div class="tabela">
  <table>
    <thead>
      <tr>
        <th>Prefixo da Viatura</th>
        <th>Data</th>
        <th>Valor</th>
        <th>Litros</th>
        <th>Nº Nota Fiscal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="registro in registros" :key="registro.id">
        <td>{{ registro.vehicle?.prefix }}</td>
        <td>{{ formatarData(registro.dateTime) }}</td>
        <td>{{ formatarValor(registro.totalValue) }}</td>
        <td>{{ registro.liters }}</td>
        <td>{{ registro.receiptNumber }}</td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
    </div>
</template>

<script>
import Sidebar from "@/views/Sidebar.vue";
import { abastecimentoService } from "@/services/abastecimentoService";
import { viaturaService } from "@/services/viaturaService";

export default {
  name: "TelaAbastecimento",
  components: { Sidebar },
  data() {
    return {
       nomeUsuario: localStorage.getItem('userName') || 'Técnico',
      registros: [],
      viaturas: [],
      mostrarFormulario: false,
      form: {
        vehicleId: '',
        dateTimeInput: '',
        receiptNumber: '',
        liters: '',
        totalValue: '',
      }
    }
  },
  async created() {
    await this.carregarRegistros()
    await this.carregarViaturas()
  },
  methods: {
    async carregarRegistros() {
      try {
        const userId = parseInt(localStorage.getItem('userId'))
        const todos = await abastecimentoService.listar()
        this.registros = todos.filter(r => r.user?.id === userId)
      } catch (error) {
        console.error("Erro ao carregar abastecimentos:", error)
      }
    },

    async carregarViaturas() {
      try {
        this.viaturas = await viaturaService.listar()
      } catch (error) {
        console.error("Erro ao carregar viaturas:", error)
      }
    },

    async enviarFormulario() {
      if (!this.form.vehicleId || !this.form.dateTimeInput ||
          !this.form.receiptNumber || !this.form.liters || !this.form.totalValue) {
        alert('Preencha todos os campos')
        return
      }

      try {

        const payload = {
          vehicleId: parseInt(this.form.vehicleId),
          cityId: 1,
          userId: parseInt(localStorage.getItem('userId')),
          dateTime: this.form.dateTimeInput + ':00',
          receiptNumber: this.form.receiptNumber,
          liters: parseFloat(this.form.liters),
          totalValue: parseFloat(this.form.totalValue),
          serviceOrderId: null
        }

        await abastecimentoService.criar(payload)
        await this.carregarRegistros()
        this.mostrarFormulario = false
        this.form = { vehicleId: '', dateTimeInput: '', receiptNumber: '', liters: '', totalValue: '' }
      } catch (error) {
        console.error("Erro ao cadastrar abastecimento:", error)
        alert('Erro ao cadastrar. Verifique o console.')
      }
    },

    formatarData(dataISO) {
      if (!dataISO) return ''
      return new Date(dataISO).toLocaleString('pt-BR')
    },

    formatarValor(valor) {
      if (!valor) return ''
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
    }
  }
}
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
  padding-left: 10px;
  margin-bottom: 20px;
  text-align: left;
}


.botao-cadastrar{
  padding: 10px 20px;
  background-color: #7AA6CC;
  color: white;
  border: 1px solid #7AA6CC;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 10px;

}

.tabela {
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

.modal {
  background: white;
  border-radius: 12% ;
  padding: 40px;
  width: 500px;
  position: relative;
}

.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.campo label{
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 14px;
}

.campo input {
  padding: 12px;
  border-radius: 8px;
}

.botao-enviar {
  width: 100%;
  padding: 14px;
  background-color: #003366;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 10px;
}

.botao-fechar {
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

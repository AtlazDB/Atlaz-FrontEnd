<template>
  <div class="tela">
    <Sidebar :nome="nomeUsuario" cargo="Técnico" userType="tecnico" />

    <div class="main">
      <div class="content-wrapper">
      <h1>Abastecimento</h1>
      <button type="button" class="botao-cadastrar" @click="mostrarFormulario = true">
        Cadastrar novo abastecimento
      </button>
</div>
      <div class="container-busca">
        <div class="searchHeader">
          <div class="searchBar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              height="20"
              width="20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input type="search" placeholder="Buscar por viatura" v-model="buscaViatura" />
          </div>

          <input
            type="text"
            class="filtro-data"
            placeholder="De (DD/MM/AAAA)"
            :value="filtroInicio"
            @input="mascaraDataInicio"
            maxlength="10"
          />

          <input
            type="text"
            class="filtro-data"
            placeholder="Até (DD/MM/AAAA)"
            :value="filtroFim"
            @input="mascaraDataFim"
            maxlength="10"
          />
        </div>
      </div>

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
            <input
              type="text"
              inputmode="numeric"
              :value="form.liters"
              @input="maskLitros"
              placeholder="Ex: 45,50"
            />
          </div>

          <div class="campo">
            <label>Valor Total</label>
            <input
              type="text"
              inputmode="numeric"
              :value="form.totalValue"
              @input="maskValor"
              placeholder="Ex: R$ 342,80"
            />
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
              <th>Mais Informações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registro in registros" :key="registro.id">
              <td>{{ registro.vehicle?.prefix }}</td>
              <td>{{ formatarData(registro.dateTime) }}</td>
              <td><span class="more-info-btn" @click="abrirDetalhes(registro)">•••</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="registroSelecionado" class="overlay" @click.self="registroSelecionado = null">
        <div class="modal-info" @click.stop>
          <h3 class="modal-title">Detalhes do Abastecimento</h3>
          <button class="botao-fechar" @click="registroSelecionado = null">✕</button>

          <div class="info-line">
            <span class="info-label">Nº da Nota Fiscal</span>
            <span class="info-value">{{ registroSelecionado.receiptNumber }}</span>
          </div>
          <div class="info-line">
            <span class="info-label">Litros</span>
            <span class="info-value">{{ registroSelecionado.liters }} L</span>
          </div>
          <div class="info-line">
            <span class="info-label">Valor Total</span>
            <span class="info-value">{{ formatarValor(registroSelecionado.totalValue) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Sidebar from '@/views/Sidebar.vue'
import { abastecimentoService } from '@/services/abastecimentoService'
import { viaturaService } from '@/services/viaturaService'

export default {
  name: 'TelaAbastecimento',
  components: { Sidebar },
  data() {
    return {
      nomeUsuario: localStorage.getItem('userName') || 'Técnico',
      registros: [],
      viaturas: [],
      mostrarFormulario: false,
      registroSelecionado: null,
      form: {
        vehicleId: '',
        dateTimeInput: '',
        receiptNumber: '',
        liters: '',
        totalValue: '',
        filtroInicio: '',
        filtroFim: '',
        registrosFiltrados: [],
      },
    }
  },
  async created() {
    await this.carregarRegistros()
    await this.carregarViaturas()
  },

  computed: {
    registrosFiltrados() {
      return this.registros.filter((r) => {
        const viatura = r.vehicle?.prefix?.toLowerCase() ?? ''
        const matchViatura = viatura.includes(this.buscaViatura.toLowerCase())

        const dataFormatada = r.dateTime ? new Date(r.dateTime).toLocaleDateString('pt-BR') : ''

        const matchInicio =
          this.filtroInicio.length < 10 ||
          dataFormatada >= this.filtroInicio.split('/').reverse().join('-')

        const matchFim =
          this.filtroFim.length < 10 ||
          dataFormatada <= this.filtroFim.split('/').reverse().join('-')

        return matchViatura && matchInicio && matchFim
      })
    },
  },
  methods: {
     async carregarRegistros() {
       try {
         const userId = parseInt(localStorage.getItem('userId'))
         const todos = await abastecimentoService.listar()
         this.registros = todos.filter((r) => r.user?.id === userId)
      } catch (error) {
         console.error('Erro ao carregar abastecimentos:', error)
       }
     },

    async carregarViaturas() {
      try {
        this.viaturas = await viaturaService.listar()
      } catch (error) {
        console.error('Erro ao carregar viaturas:', error)
      }
    },

    async enviarFormulario() {
      if (
        !this.form.vehicleId ||
        !this.form.dateTimeInput ||
        !this.form.receiptNumber ||
        !this.form.liters ||
        !this.form.totalValue
      ) {
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
          serviceOrderId: null,
        }

        await abastecimentoService.criar(payload)
        await this.carregarRegistros()
        this.mostrarFormulario = false
        this.form = {
          vehicleId: '',
          dateTimeInput: '',
          receiptNumber: '',
          liters: '',
          totalValue: '',
        }
      } catch (error) {
        console.error('Erro ao cadastrar abastecimento:', error)
        alert('Erro ao cadastrar. Verifique o console.')
      }
    },

    abrirDetalhes(registro) {
      this.registroSelecionado = registro
    },

    formatarData(dataISO) {
      if (!dataISO) return ''
      return new Date(dataISO).toLocaleString('pt-BR')
    },

    formatarValor(valor) {
      if (!valor) return ''
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
    },

    maskLitros(event) {
      let raw = event.target.value.replace(/[^\d]/g, '').slice(0, 6)
      if (raw === '') {
        this.form.liters = ''
        event.target.value = ''
        return
      }

      while (raw.length < 3) raw = '0' + raw
      const formatted = raw.slice(0, -2).replace(/^0+(\d)/, '$1') + ',' + raw.slice(-2)
      this.form.liters = parseFloat(raw.slice(0, -2) + '.' + raw.slice(-2))
      event.target.value = formatted
    },

    maskValor(event) {
      let raw = event.target.value.replace(/[^\d]/g, '').slice(0, 9)
      if (raw === '') {
        this.form.totalValue = ''
        event.target.value = ''
        return
      }
      while (raw.length < 3) raw = '0' + raw
      const intPart = raw.slice(0, -2).replace(/^0+(\d)/, '$1')
      const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      const formatted = 'R$ ' + intFormatted + ',' + raw.slice(-2)
      this.form.totalValue = parseFloat(raw.slice(0, -2) + '.' + raw.slice(-2))
      event.target.value = formatted
    },

    fmascaraDataInicio(e) {
      let v = e.target.value.replace(/\D/g, '')
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
      if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5)
      this.filtroInicio = v
    },

    mascaraDataFim(e) {
      let v = e.target.value.replace(/\D/g, '')
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
      if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5)
      this.filtroFim = v
    },
  },
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
  align-items: center;
}

h1 {
  color: #003366;
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 600;
  max-width: 900px;
}

h2 {
  color: #003366;
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.content-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.botao-cadastrar {
  padding: 10px 20px;
  background-color: #7aa6cc;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 12px;
  margin-top: 10px;
  width: fit-content;
  white-space: nowrap;
  align-self: flex-start;
}

.tabela {
  width: 100%;
  overflow-x: auto;
  max-width: 800px;
  align-self: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

th,td {
  padding: 12px 16px;
  text-align: center;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.botao-fechar {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.select-wrapper {
  position: relative;
}
.select-wrapper::after {  content: '▼';
  position: absolute;
  right: 12px;
    top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #003366;
  pointer-events: none;
}

.campo input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #003366;
  outline: none;
  background: #fff;
}

.botao-enviar {
  margin: 20px auto 0 auto;
  background: #003366;
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 20px;
  cursor: pointer;
  display: block;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.more-info-btn {
  color: #624de3;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 2px;
}

.modal-info {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-title {
  color: #003366;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}

.info-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid white;
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

.container-busca {
  width: 100%;
  max-width: 800px;
  background-color: white;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
}



.searchHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.searchBar {
  display: flex;
  align-items: center;
  background-color: #f4f6f9;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
}

.searchBar svg {
  flex-shrink: 0;
}

.searchBar input {
  width: 160px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  height: 100%;
  padding: 0 6px;
}

.filtro-data {
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #f4f6f9;
  padding: 0 10px;
  font-size: 13px;
  width: 160px;
  outline: none;

}

@media (max-width: 600px) {
  .main {
    padding: 16px 10px;
  }

  .botao-cadastrar {
    width: 100%;
    font-size: 12px;
    padding: 10px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

    .container-busca {
    padding: 8px;
  }

  .searchHeader {
    flex-direction: column;
    gap: 8px;
  }

  .searchBar {
    width: 100%;
  }

  .searchBar input {
    width: 100%;
  }

  .filtro-data {
    width: 100%;
  }

  table {
    min-width: unset;
    width: 100%;
  }

  th,
  td {
    padding: 8px 6px;
    font-size: 11px;
  }

  .modal,
  .modal-info {
    width: 95%;
    padding: 20px 12px;
    border-radius: 12px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .campo input,
  .campo select {
    font-size: 14px;
    padding: 10px;
  }
}
</style>

<template>

  <div class="tela">
     <Sidebar :nome="nomeUsuario" cargo="Técnico" userType="tecnico" />

     <div class="main-content">
        <div class="form-box">
          <h1>Ocorrências</h1>
      <div class="formulario-container">

          <div class="card-saida">
            <div class="card-body">

      <div class="dropdown-planejamento-viagem">
        <h3>Informações da ocorrência</h3>
        <label class="dropdown-label">Tipo de Ocorrência</label>

        <select class="dropdown-select" v-model="ocorrenciaSelecionada">
            <option value="">Selecione...</option>
            <option v-for="tipo in tiposOcorrencia"
                    :key="tipo"
                    :value="tipo">
              {{ labelOcorrencia[tipo] || tipo }}
            </option>
        </select>

        <div class="campo-justificativa">
           <label class="campo-label">Justificativa</label>
            <textarea v-model="justificativa" rows="3" placeholder="Informações adicionais..."></textarea>
        </div>

      </div>

      <div class="PlanejamentoRequisitante">

      <div class="campo-requisitante">
        <label class="campo-label">Requisitante</label>
        <input
          type="text"
          class="campo-input"
          v-model="requisitante"
          placeholder="Ex: Indústrias e Comércios"
        >
      </div>
      </div>

      <div class="PlanejamentoDestino">
      <div class="dropdown-planejamento-viagem">

        <label class="dropdown-label">Destino</label>

          <select class="dropdown-select" v-model="destinoSelecionado">
            <option value="">Selecione...</option>
            <option value="Aparecida">Aparecida</option>
            <option value="Arapeí">Arapeí</option>
            <option value="Areias">Areias</option>
            <option value="Bananal">Bananal</option>
            <option value="Biritiba-Mirim">Biritiba-Mirim</option>
            <option value="Caçapava">Caçapava</option>
            <option value="Cachoeira Paulista">Cachoeira Paulista</option>
            <option value="Campos do Jordão">Campos do Jordão</option>
            <option value="Canas">Canas</option>
            <option value="Caraguatatuba">Caraguatatuba</option>
            <option value="Cruzeiro">Cruzeiro</option>
            <option value="Cunha">Cunha</option>
            <option value="Guararema">Guararema</option>
            <option value="Guaratinguetá">Guaratinguetá</option>
            <option value="Igaratá">Igaratá</option>
            <option value="Jacareí">Jacareí</option>
            <option value="Jambeiro">Jambeiro</option>
            <option value="Lagoinha">Lagoinha</option>
            <option value="Lavrinhas">Lavrinhas</option>
            <option value="Lorena">Lorena</option>
            <option value="Monteiro Lobato">Monteiro Lobato</option>
            <option value="Natividade da Serra">Natividade da Serra</option>
            <option value="Nazaré Paulista">Nazaré Paulista</option>
            <option value="Paraibuna">Paraibuna</option>
            <option value="Pindamonhangaba">Pindamonhangaba</option>
            <option value="Piquete">Piquete</option>
            <option value="Potim">Potim</option>
            <option value="Queluz">Queluz</option>
            <option value="Redenção da Serra">Redenção da Serra</option>
            <option value="Roseira">Roseira</option>
            <option value="Salesópolis">Salesópolis</option>
            <option value="Santa Branca">Santa Branca</option>
            <option value="Santo Antônio do Pinhal">Santo Antônio do Pinhal</option>
            <option value="São Bento do Sapucaí">São Bento do Sapucaí</option>
            <option value="São José do Barreiro">São José do Barreiro</option>
            <option value="São José dos Campos">São José dos Campos</option>
            <option value="São Luiz do Paraitinga">São Luiz do Paraitinga</option>
            <option value="Silveiras">Silveiras</option>
            <option value="Taubaté">Taubaté</option>
            <option value="Tremembé">Tremembé</option>
            <option value="Ubatuba">Ubatuba</option>
          </select>

  <div class="saida">
          <h3>Saída</h3>

      <div class="dropdown-viatura">
        <label class="dropdown-label">Viatura</label>

        <select class="dropdown-select" v-model="viaturaSelecionada">
          <option value="">Selecione...</option>
          <option
            v-for="viatura in viaturas"
            :key="viatura.id"
            :value="viatura.id"
          >
            {{ viatura.prefix }} - {{ viatura.brand }} {{ viatura.model }}
          </option>
        </select>

      </div>

      <div class="campo-Horario-Saida">
        <label class="campo-label">Hora de Saída</label>
        <input
          type="text"
          class="campo-input"
          v-model="HorarioSaida"
        >
      </div>

        <div class="campo-data">
        <label class="campo-label">Data Saída</label>
       <input
        type="text"
        class="campo-input"
        v-model="dataSaida"
        placeholder="DD/MM/YYYY">
        </div>

          <div class="botao-enviar">
            <button
               type="button"
               class="btn-enviar"
               @click="salvarSaida">
                 Registrar Saída
            </button>
    </div>
  </div>
      </div>
      </div>
    </div>


</div>

    <div class="card-chegada">

       <div class="card-body">
        <h3>Chegada</h3>
      <div class="kmChegada">
        <label class="campo-label">Chegada(KM)</label>
        <input
          type="text"
          class="campo-input"
          v-model="ChegadaKM"
        >
      </div>

      <div class="Horario-Chegada">
        <label class="campo-label">Hora de Chegada</label>
        <input
          type="text"
          class="campo-input"
          v-model="HorarioChegada"
        >
      </div>

      <div class="Data-chegada">
       <div class="campo-data">
        <label class="campo-label">Data Chegada</label>
        <input type="text"
          class="campo-input"
          v-model="dataChegada"
          placeholder="DD/MM/YYYY">
       </div>
    </div>
           <div class="botao-enviar">
            <button
               type="button"
               class="btn-enviar"
               @click="salvarChegada">
                 Registrar Chegada
            </button>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/Sidebar.vue";
import { ordemDeServicoService } from '@/services/ordemDeServico.js'
import { viaturaService } from '@/services/viaturaService.js'

export default {
   components: {
    Sidebar
  },
  data() {
    return {
      nomeUsuario: localStorage.getItem('userName') || 'Técnico',
      osId: null,
      viaturas: [],
      viaturaSelecionada: "",

      ocorrenciaSelecionada: "",
      tiposOcorrencia: [],
      labelOcorrencia: {
        ADMINISTRATIVO: 'Administrativo',
        AUDITORIA: 'Auditoria',
        ENSAIO: 'Ensaio',
        FISCALIZACAO: 'Fiscalização',
        INSPECAO: 'Inspeção',
        INSPETORIA: 'Inspetoria',
        JURIDICO: 'Jurídico',
        OFICINA: 'Oficina',
        SUPERVISAO: 'Supervisão',
        TRANSLADO: 'Translado',
        VERIFICACAO: 'Verificação'
      },

      justificativa: "",
      requisitante: "",
      destinoSelecionado: "",

      SaidaKM: "",
      ChegadaKM: "",
      HorarioSaida: "",
      HorarioChegada: "",
      dataSaida: "",
      dataChegada: "",

      Litros: "",
      Valor: "",
      notaFiscal: "",
      kmAtualViatura: 0
  }
},

computed: {
    kmPercorrido() {
      if (this.SaidaKM && this.ChegadaKM) {
        const saida = parseFloat(this.SaidaKM);
        const chegada = parseFloat(this.ChegadaKM);
        return (chegada - saida).toFixed(2);
      }
      return 0;
    },

    valorFormatado() {
      if (this.Valor) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(this.Valor);
      }
      return 'R$ 0,00';
    }
  },

  async mounted() {
     console.log('userId no localStorage:', localStorage.getItem('userId'))
    await this.carregarViaturas();
    this.tiposOcorrencia = await ordemDeServicoService.listaTipos();
    await this.carregarSaidaPendente();
  },
  watch: {
    async viaturaSelecionada(novoId) {
      if (!novoId) {
        this.kmAtualViatura = 0
        return
      }
      try {
        const viatura = await viaturaService.buscarPorId(novoId)
        this.kmAtualViatura = viatura.km
        console.log('vehicleId:', this.viaturaSelecionada, typeof this.viaturaSelecionada)
      } catch (e) {
        console.error('Erro ao buscar KM da viatura:', e)
      }
    }
  },
  methods: {

    async salvarSaida() {
      if(!this.viaturaSelecionada){
        this.exibirMensagem("Selecione uma viatura.");
        return;
      }

      if(!this.ocorrenciaSelecionada){
        this.exibirMensagem("Selecione o tipo de ocorrência.");
        return;
      }

      if(!this.requisitante){
        this.exibirMensagem("Informe o requisitante.");
        return;
      }

      if (!this.destinoSelecionado) {
        this.exibirMensagem("Selecione o destino.");
        return;
      }

      if(!this.HorarioSaida){
        this.exibirMensagem("Informe o horário de saída.");
        return;
      }

      if (!this.validarHorario(this.HorarioSaida)) {
        this.exibirMensagem("Horário de saída inválido. Use o formato HH:MM.");
        return;
      }

      if(!this.dataSaida){
        this.exibirMensagem("Informe a data de saída.");
        return;
      }

      if (!this.validarData(this.dataSaida)) {
        this.exibirMensagem("Data de saída inválida. Use o formato DD/MM/YYYY.");
        return;
      }
      console.log('userId:', parseInt(localStorage.getItem('userId')), typeof parseInt(localStorage.getItem('userId')))
    try {
      const dadosOs = {
        serviceType: this.ocorrenciaSelecionada,
        destinationLocation: this.destinoSelecionado,
        justification: this.justificativa,
        requester: this.requisitante,
        departureKm: this.kmAtualViatura,
        departureDate: this.converterDataHora(this.dataSaida, this.HorarioSaida),
        userId: parseInt(localStorage.getItem('userId')),
        vehicleId: parseInt(this.viaturaSelecionada)
      }

      console.log('Payload saída:', dadosOs)
      const os = await ordemDeServicoService.salvar(dadosOs)
      this.osId = os.id

      } catch (error) {
        console.error('Erro ao registrar saída:', error)
        this.exibirMensagem('Erro ao registrar. Tente novamente.')
      }
    },

    async carregarViaturas() {
      try {
        const lista = await viaturaService.listar()
        this.viaturas = lista.filter(v => v.status === 'DISPONIVEL')
      } catch (error) {
        console.error('Erro ao carregar viaturas:', error)
    }
    },

    async salvarChegada(){
      if(!this.osId){
        this.exibirMensagem("Nenhuma saída foi registrada.");
        return;
      }

      if (!this.ChegadaKM) {
        this.exibirMensagem("Informe a quilometragem de chegada.");
        return;
      }

      if(!this.HorarioChegada){
        this.exibirMensagem("Informe o horário de chegada.");
        return;
      }

      if (!this.validarQuilometragem(this.ChegadaKM)) {
        this.exibirMensagem("Quilometragem de chegada inválida.");
        return;
      }

      if (!this.validarHorario(this.HorarioChegada)) {
        this.exibirMensagem("Horário de chegada inválido. Use o formato HH:MM.");
        return;
      }

      if(!this.dataChegada){
        this.exibirMensagem("Informe a data de chegada.");
        return;
      }

      if (!this.validarData(this.dataChegada)) {
        this.exibirMensagem("Data de chegada inválida. Use o formato DD/MM/YYYY.");
        return;
      }

    try {
      const dadosAtualizacao = {
      arrivalKm: parseFloat(this.ChegadaKM),
      returnDate: this.converterDataHora(this.dataChegada, this.HorarioChegada)
    };

    await ordemDeServicoService.atualizar(this.osId, dadosAtualizacao)
    this.osId = null;
    this.resetarFormulario();
    } catch (error) {
        console.error('Erro ao registrar chegada:', error);
        this.exibirMensagem('Erro ao registrar. Tente novamente.');
    }
  },

    validarQuilometragem(km) {
      const kmNum = parseFloat(km);
      return !isNaN(kmNum) && kmNum > 0;
    },

    validarHorario(horario) {
      const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(horario);
    },

    converterDataHora(data, hora) {
      if (!data) return null;
      const [dia, mes, ano] = data.split('/');
      const horaFormatada = hora || '00:00';
      return `${ano}-${mes}-${dia}T${horaFormatada}:00`;
    },

    exibirMensagem(mensagem, tipo) {
      alert(mensagem);
    },

  validarFormulario() {
      const camposObrigatorios = [
        { campo: this.viaturaSelecionada, nome: "Viatura" },
        { campo: this.ocorrenciaSelecionada, nome: "Tipo de Ocorrência" },
        { campo: this.requisitante, nome: "Requisitante" },
        { campo: this.destinoSelecionado, nome: "Destino" },
        { campo: this.SaidaKM, nome: "Quilometragem de Saída" }
      ];

      const camposVazios = camposObrigatorios.filter(item => !item.campo);

      if (camposVazios.length > 0) {
        const mensagem = `Preencha os campos obrigatórios: ${camposVazios.map(item => item.nome).join(", ")}`;
        this.exibirMensagem(mensagem, 'erro');
        return false;
      }

      return true;
    },


    validarDatas() {
      if (this.dataSaida && !this.validarData(this.dataSaida)) {
        this.exibirMensagem("Data de saída inválida. Use o formato DD/MM/YYYY");
        return false;
      }

      if (this.dataChegada && !this.validarData(this.dataChegada)) {
        this.exibirMensagem("Data de chegada inválida. Use o formato DD/MM/YYYY");
        return false;
      }

      return true;
    },

    validarData(data) {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(data)) return false;

      const [dia, mes, ano] = data.split('/').map(Number);
      const dataObj = new Date(ano, mes - 1, dia);

      return dataObj.getFullYear() === ano &&
             dataObj.getMonth() === mes - 1 &&
             dataObj.getDate() === dia;
    },

 resetarFormulario() {
      this.viaturaSelecionada = "";
      this.ocorrenciaSelecionada = "";
      this.justificativa = "";
      this.requisitante = "";
      this.destinoSelecionado = "";
      this.SaidaKM = "";
      this.ChegadaKM = "";
      this.HorarioSaida = "";
      this.HorarioChegada = "";
      this.dataSaida = "";
      this.dataChegada = "";
      this.Litros = "";
      this.Valor = "";
      this.notaFiscal = "";
    },
    async carregarSaidaPendente() {
      try {
        const userId = parseInt(localStorage.getItem('userId'))
        const ordens = await ordemDeServicoService.listar()
        const pendente = ordens.find(
          os => os.user.id === userId && os.returnDate === null
        )
        if (pendente) {
            this.osId = pendente.id
            this.viaturaSelecionada = pendente.vehicle.id
            this.kmAtualViatura = pendente.vehicle.km
            this.ocorrenciaSelecionada = pendente.serviceType
            this.justificativa = pendente.justification
            this.requisitante = pendente.requester
            this.destinoSelecionado = pendente.destinationLocation
            this.dataSaida = this.converterParaDataBR(pendente.departureDate)
            this.HorarioSaida = this.converterParaHora(pendente.departureDate)
        }
      } catch (e) {
        console.error('Erro ao carregar saída pendente:', e)
      }
    },

    converterParaDataBR(dataISO) {
      if (!dataISO) return ''
      const data = new Date(dataISO)
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const ano = data.getFullYear()
      return `${dia}/${mes}/${ano}`
    },

    converterParaHora(dataISO) {
      if (!dataISO) return ''
      const data = new Date(dataISO)
      const hora = String(data.getHours()).padStart(2, '0')
      const min = String(data.getMinutes()).padStart(2, '0')
      return `${hora}:${min}`
    }
  }
};

</script>

<style scoped>

.tela {
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-box {
  width: 100%;
  max-width: 900px;
  padding: 30px;
}
.form-box > h1 {
  color: #003366;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.formulario-container{
  display: grid;
  gap: 30px;
}


.card-saida,
.card-chegada{
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.card-chegada:hover, .card-saida:hover{
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.card-saida h3,
.card-chegada h3{
  color: #003366;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e1e5e9;
  padding-bottom: 10px;
  margin-bottom: 15px;
}


.card-body {
  padding: 25px;
  display: flex;
  flex-direction: column;
}

.dropdown-label,
.campo-label {
  display: flex;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
  max-width: 600px;
  margin: 0 auto 15px;;
}

.dropdown-select,
.campo-input,
textarea {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  display: block;
  border: 1px solid #697179;
  border-radius: 10px;
  outline: none;
  margin: 0 auto 15px;;
  font-size: 14px;
}

textArea {
   resize: none;
   min-height: 70px;
}

.Datas {
  grid-column: span 2;
  display: flex;
  gap: 15px;
}

.campo-data {
  flex: 1;
}

.campo-justificativa textarea {
  border: 2px line #003366;
}

.botao-enviar {
  text-align: center;
  margin-top: 20px;
}

.btn-enviar {
  background: #003366;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}
</style>

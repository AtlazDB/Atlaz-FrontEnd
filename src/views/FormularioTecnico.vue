<template>

  <div class="tela">
     <Sidebar
      nome="Karthi Madesh"
      cargo="Técnico"
      userType="tecnico"
      @abrirFormulario="abrirFormulario"
    />

     <div class="main-content">
        <div class="form-box">
<div class="formulario-container">

          <div class="card-saida">
            <div class="informacoes-ocorrencia">
      <div class="dropdown-planejamento-viagem">
        <h3>Informações da ocorrência</h3>
        <select class="dropdown-select" v-model="ocorrenciaSelecionada">
            <option value="">Tipo de Ocorrência</option>
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

      </div>
      </div>
    </div>
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
            > {{ viatura.prefixo }} - {{ viatura.modelo.nomeModelo}}</option>
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
        v-model="dataSaida"
        placeholder="DD/MM/YYYY">
        </div>
          <div class="botao-enviar">
            <button
               t ype="button"
               class="btn-enviar"
               @click="salvarDados"
            >
                 Registrar Saída
            </button>
    </div>
  </div>
</div>

    <div class="card-chegada">
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
        <input type="text" v-model="dataChegada" placeholder="DD/MM/YYYY">
       </div>
    </div>
           <div class="botao-enviar">
            <button
               t ype="button"
               class="btn-enviar"
               @click="salvarDados"
            >
                 Registrar Chegada
            </button>
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>

    <!-- <div class="Abastecimento">
    <h2 class="Abastecimento-titulo">ABASTECIMENTO</h2>
       <div class="campo-Litros">
        <label class="campo-label">Litros</label>
        <input
          type="text"
          class="campo-input"
          v-model="Litros"
          placeholder="0,00"
        >
      </div>

       <div class="campo-Valor">
        <label class="campo-label">Valor Total (R$)</label>
        <input
          type="text"
          class="campo-input"
          v-model="Valor"
          placeholder="R$ 0,00"
        >
      </div>

      <div class="campo-NotaFiscal">
        <label class="campo-label">N° Nota Fiscal</label>
        <input
          type="text"
          class="campo-input"
          v-model="notaFiscal"
          placeholder="000.000.000"
        >
      </div>

    </div>

    <div class="botao-enviar">
     <button
    type="button"
    class="btn-enviar"
    @click="salvarDados"
  >
    Enviar
   </button>
        </div>
      </div>
    </div>
  </div>
</div>-->
</template> 

<script>
import Sidebar from "@/views/Sidebar.vue";
import { viaturaService } from '@/services/viaturaService.js'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'
import { abastecimentoService } from '@/services/abastecimentoService.js'


export default {
   components: {
    Sidebar
  },
  data() {
    return {
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
      notaFiscal: ""
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
    await this.carregarViaturas();
    this.tiposOcorrencia = await ordemDeServicoService.listaTipos();
  },

  methods: {
    abrirFormulario(){

    },
    async carregarViaturas() {
      try {
        this.viaturas = await viaturaService.listar();
        console.log('✅ Viaturas carregadas:', this.viaturas);
      } catch (error) {
        console.error('❌ Erro ao carregar viaturas:', error);
      }
    },

    async salvarDados() {
      if (!this.validarFormulario()) return;
      if (!this.validarNumeros()) return;
      if (!this.validarDatas()) return;

      try {
        // 1. Salva a Ordem de Serviço
        const dadosOs = {
          tipoServico: this.ocorrenciaSelecionada,
          localDestino: this.destinoSelecionado,
          justificativa: this.justificativa,
          requisitante: this.requisitante,
          kmSaida: parseFloat(this.SaidaKM),
          kmChegada: parseFloat(this.ChegadaKM),
          dataSaida: this.converterDataHora(this.dataSaida, this.HorarioSaida),
          dataRetorno: this.converterDataHora(this.dataChegada, this.HorarioChegada),
          idUsuario: 1, // fixo por enquanto, depois vem do login
          idViatura: this.viaturaSelecionada
        };

        const os = await ordemDeServicoService.salvar(dadosOs);

        // 2. Salva o abastecimento, apenas se houver
        if (this.Litros||this.Valor||this.notaFiscal) {
          const dadosAbastecimento = {
            dataHora: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1),
            litros: parseFloat(this.Litros),
            valorTotal: parseFloat(this.Valor),
            numeroNotaFiscal: this.notaFiscal,
            idUsuario: 1, // fixo, substituir quando houver login
            idViatura: this.viaturaSelecionada,
            idCidade: 1, // fixo por enquanto, depois vem do destino
            idOs: os.id
          };

          await abastecimentoService.criar(dadosAbastecimento);
        }

        this.resetarFormulario();

      } catch (error) {
        console.error('Erro ao salvar:', error);
      }
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

 validarNumeros() {
      if (this.SaidaKM && isNaN(parseFloat(this.SaidaKM))) {
        this.exibirMensagem("Quilometragem de saída deve ser um número válido", 'erro');
        return false;
      }

      if (this.ChegadaKM && isNaN(parseFloat(this.ChegadaKM))) {
        this.exibirMensagem("Quilometragem de chegada deve ser um número válido", 'erro');
        return false;
      }

      if (this.Litros && isNaN(parseFloat(this.Litros))) {
        this.exibirMensagem("Litros deve ser um número válido", 'erro');
        return false;
      }

      if (this.Valor && isNaN(parseFloat(this.Valor))) {
        this.exibirMensagem("Valor deve ser um número válido", 'erro');
        return false;
      }

      return true;
    },


    validarDatas() {
      if (this.dataSaida && !this.validarData(this.dataSaida)) {
        this.exibirMensagem("Data de saída inválida. Use o formato DD/MM/YYYY", 'erro');
        return false;
      }

      if (this.dataChegada && !this.validarData(this.dataChegada)) {
        this.exibirMensagem("Data de chegada inválida. Use o formato DD/MM/YYYY", 'erro');
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
  padding: 20px;
}

.formulario-container{
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}

.identificacao-titulo,
.Planejamento-titulo,
.Medicao-titulo,
.Abastecimento-titulo{
  font-size: 18px;
  color: #003366;
  margin-bottom: 15px;
  margin-top: 10px;
  list-style: none;
}


.dropdown-label,
.campo-label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.dropdown-select,
.campo-input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #697179;
  border-radius: 10px;
  outline: none;
  margin-bottom: 15px;
  font-size: 14px;
}

textArea {
   resize: none;
   min-height: 70px;
}

.identificacaoViatura,
.PlanejamentoViagem,
.Medicao,
.Abastecimento {
  margin-bottom: 20px;
}

.Medicao {
  display:list-item;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.Datas {
  grid-column: span 2;
  display: flex;
  gap: 15px;
}

.campo-data {
  flex: 1;
}

.Abastecimento {
  display: list-item;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
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

.btn-enviar:hover {
  background: #002244;
}

@media (max-width: 768px) {
  .Medicao {
    grid-template-columns: 1fr;
  }

  .Datas {
    flex-direction: column;
  }

  .Abastecimento {
    grid-template-columns: 1fr;
  }
}
</style>

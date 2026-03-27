<template>
  <div class="formulario-container">
    
    <header class="header">
      <h1></h1>
    </header>

    <div class="identificacaoViatura">
      <h2 class="identificacao-titulo">IDENTIFICAÇÃO</h2>

      <div class="dropdown-viatura">
        <label class="dropdown-label">Viatura</label>
        <select class="dropdown-select" v-model="viaturaSelecionada">
          <option value="">Selecione...</option>
          <option value="L746">L746 - HYUNDAI HB20</option>
          <option value="L747">L747 - FIAT ARGO</option>
          <option value="L748">L748 - VW GOL</option>
        </select>
      </div>

    </div>

    <div class="PlanejamentoViagem">
      <h2 class="Planejamento-titulo">PLANEJAMENTO</h2>

      <div class="dropdown-planejamento-viagem">

        <label class="dropdown-label">Tipo de Ocorrência</label>

        <select class="dropdown-select" v-model="ocorrenciaSelecionada">
            <option value="">Selecione...</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Auditoria">Auditoria</option>
            <option value="Ensaio">Ensaio</option>
            <option value="Fiscalização">Fiscalização</option>
            <option value="Inspeção">Inspeção</option>
            <option value="Inspetoria">Inspetoria</option>
            <option value="Juridico">Juridico</option>
            <option value="Oficina">Oficina</option>
            <option value="Supervisão">Supervisão</option>
            <option value="Translado">Translado</option>
            <option value="Verificação">Verificação</option>
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

    <div class="Medicao">
       <h2 class="Medicao-titulo">MEDIÇÃO</h2>

       <div class="campo-Saida">
        <label class="campo-label">Saída(KM)</label>
        <input 
          type="text" 
          class="campo-input" 
          v-model="SaidaKM"
        >
      </div>

      <div class="campo-Chegada">
        <label class="campo-label">Chegada(KM)</label>
        <input 
          type="text" 
          class="campo-input" 
          v-model="ChegadaKM"
        >
      </div>

      <div class="campo-Horario-Saida">
        <label class="campo-label">Hora de Saída</label>
        <input 
          type="text" 
          class="campo-input" 
          v-model="HorarioSaida"
        >
      </div>

      <div class="campo-Horario-Chegada">
        <label class="campo-label">Hora de Chegada</label>
        <input 
          type="text" 
          class="campo-input" 
          v-model="HorarioChegada"
        >
      </div>

      <div class="Datas">

       <div class="campo-data">
        <label class="campo-label">Data Saída</label>
       <input
        type="text"
        v-model="dataSaida"
        placeholder="DD/MM/YYYY">
        </div>
  
       <div class="campo-data">
        <label class="campo-label">Data Chegada</label>
        <input type="text" v-model="dataChegada" placeholder="DD/MM/YYYY">
       </div>
      </div>

    </div>
    
    <div class="Abastecimento">

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
</template>

<script>

import api from '@/services/api'

export default {
  data() {
    return {
      viaturaSelecionada: "", 

      ocorrenciaSelecionada: "",  
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
  },
  
  methods: {

     async carregarViaturas() {
      try {
        this.viaturas = await viaturaService.listar();
        console.log('✅ Viaturas carregadas:', this.viaturas);
      } catch (error) {
        console.error('❌ Erro ao carregar viaturas:', error);
        this.exibirMensagem('Erro ao carregar lista de viaturas', 'erro');
      }
    },

    async salvarDados(){
      if (!this.validarFormulario()) return;
      if (!this.validarNumeros()) return;
      if (!this.validarDatas()) return;

      const viaturaSelecionadaObj = this.viaturas.find(v => v.id == this.viaturaSelecionada);

      const dados = {
        identificacao: {
          viatura: this.viaturaSelecionada
        },

        planejamento: {
          ocorrencia: this.ocorrenciaSelecionada,
          justificativa: this.justificativa,
          requisitante: this.requisitante,
          destino: this.destinoSelecionado
        },

        medicao: {
          kmSaida: this.saidaKM,
          Kmchegada: this.ChegadaKM,
          horarioSaida: this.HorarioSaida,
          horarioChegada:this.HorarioChegada,
          dataSaida: this.dataSaida,
          dataChegada: this.dataChegada
        },

        abastecimento: {
          litros: this.Litros,
          valorTotal: this.valor,
          notaFiscal:this.notaFiscal
        },
         dataRegistro: new Date().toISOString()
    };

    try {
        const response = await viagemService.salvar(dados);
        
        console.log('Dados salvos com sucesso:', response);
        this.exibirMensagem('Dados salvos com sucesso!', 'sucesso');
        this.resetarFormulario();
        
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
        
       if (error.response) {
        const status = error.response.status;
  
      if (status === 400) {
         this.exibirMensagem('Erro de validação. Verifique os dados informados.', 'erro');
      } else if (status === 500) {
         this.exibirMensagem('Erro no servidor. Tente novamente mais tarde.', 'erro');
      } else {
         this.exibirMensagem(`Erro ${status} ao salvar dados.`, 'erro');
      }
      } else if (error.request) {
        this.exibirMensagem(`Erro: ${error.message}`, 'erro');
      }

      } finally {
        this.carregando = false;
      }
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
.formulario{
  max-width: 900px;
  margin: auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
}

.identificacao-titulo,
.Planejamento-titulo,
.Medicao-titulo {
  font-size: 14px;
  color: #003366;
  margin-bottom: 15px;
  margin-top: 20px;
}


.dropdown-label,
.campo-label {
  display: block;
  font-size: 13px;
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

</style>
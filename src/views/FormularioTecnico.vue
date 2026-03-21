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
        </select>

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
            <option value="Roseira"></option>
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

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      viaturaSelecionada: "",
      ocorrenciaSelecionada: "",
      requisitante: "",
      destinoSelecionado: "",
      SaidaKM: "",
      ChegadaKM: "",
      HorarioSaida: "",
      HorarioChegada: ""
  }
}
}
</script>

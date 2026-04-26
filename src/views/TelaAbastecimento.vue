<template>

    <div class="tela">
     <Sidebar
      nome="Karthi Madesh"
      cargo="Técnico"
      userType="tecnico"
    />

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
      <label>Prefixo da Viatura</label>
      <input
       v-model="form.viatura" />
    </div>   

    <div class="campo">
      <label>Quilometragem que está sendo abastecido</label>
      <input
       v-model="form.quilometragem" />
    </div>

    <div class="campo">
      <label>Número da nota fiscal</label>
      <input 
      v-model="form.notaFiscal" />
    </div>

    <div class="campo">
      <label>Litros</label>
      <input
       v-model="form.litros" />
    </div>

    <button 
    class="botao-enviar" 
    @click="enviarFormulario">
    Enviar
   </button>

    <button 
    class="botao-fechar"
    @click="mostrarFormulario = false">
    ✕
    </button>
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
          <tbody class="registros_tabela">
             <tr v-for="registro in registros" :key="registro.id">
                 <td>{{ registro.viatura }}</td>
                 <td>{{ registro.data }}</td>
                 <td>{{ registro.valor }}</td>
                 <td>{{ registro.litros }}</td>  
                 <td>{{ registro.notaFiscal }}</td>
             </tr>
          </tbody>
        </table>
        </div>

    </div>
    </div>
</template>

<script>
import Sidebar from "@/views/Sidebar.vue";

export default {
  name: "TelaAbastecimento",
  components: {
    Sidebar
  }, 
  data() {
  return {
    registros: [],
    mostrarFormulario: false,
    form: {
      viatura:'',
      quilometragem: '',
      notaFiscal: '',
      litros: ''
    }
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

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { abastecimentoService } from '@/services/abastecimentoService.js'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'


const registros = ref([])
const carregando = ref(true)
const props = defineProps(['filtro'])
const registrosFiltrados = computed(() =>{
  if(!props.filtro) return registros.value
  return registros.value.filter(reg => {
    const data = new Date(reg.os.dataSaida)
    return data.getMonth() === props.filtro.mes &&
      data.getFullYear() === props.filtro.ano
  })
})

async function carregarTodos() {
  carregando.value = true
  try {
    const  [ordens, abastecimentos] = await Promise.all([
      ordemDeServicoService.listar(),
      abastecimentoService.listar(),
    ])
    registros.value = ordens.map(os => {
      const abastecimento = abastecimentos.find(a => a.ordemServico?.id == os.id)
      return { os, abastecimento }
    })
  }catch (erro) {
    console.error('Erro: ' + erro)
  }finally {
    carregando.value = false
  }
}

onMounted(() => carregarTodos())

function formatarHora(dataISO) {
  if (!dataISO) return '-'
  const [, hora] = dataISO.split('T')
  return hora.slice(0, 5) // pega só HH:mm
}
function formatarData(dataISO) {
  if (!dataISO) return '-'
  const [data] = dataISO.split('T')
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarValor(valor) {
  if (!valor) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}
// function mudarTabela(valor) {
//   if (valor === 'Janeiro2025') {
//     corpo_tabela.value = [
//       {
//         id: 1,
//         viatura: 'City',
//         ocorrencia: 'Nenhuma',
//         justificativa: 'aaaaaabbbbbbbbbbbb',
//         requisitante: 'abc',
//         destino: 'SP',
//         km_saida: '12',
//         km_chegada: '25',
//         hr_saida: '9',
//         hr_chegada: '16',
//         data_saida: '12/02/2025',
//         data_chegada: '12/02/2025',
//         litros: '2',
//         valor: '12,65',
//         nota_fiscal: '1234567890',
//       },
//       { id: 2, viatura: 'Onix', ocorrencia: 'Alguma' },
//     ]
//   } else if (valor === 'Fevereiro2025') {
//     corpo_tabela.value = [
//       { id: 3, viatura: 'Kwid', ocorrencia: 'Sem nada' },
//       { id: 4, viatura: 'Porche', ocorrencia: '' },
//     ]
//   } else if (valor === 'Março2025') {
//     corpo_tabela.value = [{ id: 5, viatura: 'Picape', ocorrencia: 'Vazio' }]
//   } else {
//     corpo_tabela.value = []
//   }
// }
watch(() => props.filtro, async (filtro) => {
  if (!filtro) {
    carregarTodos()
    return
  }
  carregando.value = true
  try {
    const [ordens, abastecimentos] = await Promise.all([
      ordemDeServicoService.listarPorMes(filtro.mes + 1, filtro.ano),
      abastecimentoService.listarPorMes(filtro.mes + 1, filtro.ano)
    ])

    registros.value = ordens.map(os => {
      const abastecimento = abastecimentos.find(a => a.ordemServico?.id === os.id)
      return { os, abastecimento }
    })
  } catch (error) {
    console.error('Erro:', error)
  } finally {
    carregando.value = false
  }
})
//   () => tabela,
//   (novoValor) => {
//     mudarTabela(novoValor)
//     nome_tabela.value = novoValor
//   },
//   { immediate: true },
/*
function exportarTabela() {
  let csv = "id,viatura,ocorrencia"
  for (const linha in corpo_tabela.value) {
    console.log(corpo_tabela[linha[linha]])
    const id_str = toString(corpo_tabela[linha.id])
    csv = csv + "\n" + id_str + corpo_tabela[linha.viatura] + corpo_tabela[linha.ocorrencia]
  }

  const blob = new Blob([csv], { type: 'text/csv' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = nome_tabela.value + '.csv'

  link.click()
}
*/
/* Para quando tiver o metodo http
onMounted(async () => {
  try {
    //Colocar o link para requisição
    const response = await fetch('http/')
    corpo_tabela.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
 */
</script>

<template>
  <div class="tabela">
    <h1 class="titulo">Registros</h1>
    <button
      v-if="registrosFiltrados.length > 0"
      @click="ordemDeServicoService.exportarCsv(props.filtro?.mes, props.filtro?.ano)">Exportar tabela</button>

    <p v-if="carregando">Carregando...</p>

    <table v-else-if="registrosFiltrados.length > 0">
      <thead>
      <tr>
        <th>Viatura</th>
        <th>Ocorrência</th>
        <th>Justificativa</th>
        <th>Requisitante</th>
        <th>Destino</th>
        <th>KM de saída</th>
        <th>KM de chegada</th>
        <th>Horário saída</th>
        <th>Horário chegada</th>
        <th>Data saída</th>
        <th>Data chegada</th>
        <!-- Abastecimento -->
        <th>Litros</th>
        <th>Valor</th>
        <th>Nota fiscal</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reg in registrosFiltrados" :key="reg.os.id">
        <td>{{ reg.os.viatura.prefixo }} - {{ reg.os.viatura.modelo.nomeModelo }}</td>
        <td>{{ reg.os.tipoServico }}</td>
        <td>{{ reg.os.justificativa }}</td>
        <td>{{ reg.os.requisitante }}</td>
        <td>{{ reg.os.localDestino }}</td>
        <td>{{ reg.os.kmSaida }}</td>
        <td>{{ reg.os.kmChegada }}</td>
        <td>{{ formatarHora(reg.os.dataSaida) }}</td>
        <td>{{ formatarHora(reg.os.dataRetorno) }}</td>
        <td>{{ formatarData(reg.os.dataSaida) }}</td>
        <td>{{ formatarData(reg.os.dataRetorno) }}</td>
        <!-- Abastecimento pode ser vazio -->
        <td>{{ reg.abastecimento?.litros ?? '-' }}</td>
        <td>{{ reg.abastecimento ? formatarValor(reg.abastecimento.valorTotal) : '-' }}</td>
        <td>{{ reg.abastecimento?.numeroNotaFiscal ?? '-' }}</td>
      </tr>
      </tbody>
    </table>

    <p class="info" v-else>Sem informação</p>
    </div>
</template>
<!--    <button v-if="corpo_tabela.length > 0" v-on:click="exportarTabela">Exportar tabela</button>-->
<!--    <table v-if="corpo_tabela.length > 0">-->
<!--      <thead>-->
<!--        <tr>-->

<!--        <tr v-for="linha in corpo_tabela" :key="linha.id">-->
<!--          <td>{{ linha.viatura }}</td>-->

<!--          <td>{{ linha.ocorrencia }}</td>-->
<!--          <td>{{ linha.justificativa }}</td>-->
<!--          <td>{{ linha.requisitante }}</td>-->
<!--          <td>{{ linha.destino }}</td>-->

<!--          <td>{{ linha.km_saida }}</td>-->
<!--          <td>{{ linha.km_chegada }}</td>-->
<!--          <td>{{ linha.hr_saida }}</td>-->
<!--          <td>{{ linha.hr_chegada }}</td>-->
<!--          <td>{{ linha.data_saida }}</td>-->
<!--          <td>{{ linha.data_chegada }}</td>-->

<!--          <td>{{ linha.litros }}</td>-->
<!--          <td>{{ linha.valor }}</td>-->
<!--          <td>{{ linha.nota_fiscal }}</td>-->
<!--          &lt;!&ndash; ... &ndash;&gt;-->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <p class="info" v-else>Sem informação</p>-->
<!--  </div>-->
<!--</template>-->

<style scoped>
.titulo {
  font-size: 30px;
  border-left: 5px #003366 solid;
  padding-left: 5px;
}
.tabela {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  //background-color: #697179;
}
.info {
  align-self: center;
}
button {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  background-color: #003366;
  color: #ffffff;
  width: fit-content;
  cursor: pointer;
}
table {
  border-collapse: collapse;
  max-width: 100%;
  table-layout: fixed;
}
td,
th {
  border: 1px solid #ddd;
  font-size: 11px;
  padding-right: 2px;
  padding-left: 2px;
}
th:nth-child(6),
th:nth-child(7) {
  max-width: 55px;
}
td {
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  text-align: center;
}
tbody tr:hover td {
  background-color: #7aa6cc;
  transition: 0.1s;
}
</style>

<template>
  <div class="h-full flex flex-col">
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <p class="text-indigo-600 font-bold animate-pulse">Carregando painel...</p>
    </div>

    <div v-else-if="resumoDados" class="fade-in space-y-8 w-full">
      
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">Visão Geral</h2>
        <div class="flex gap-3">
          <span class="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-emerald-100 flex items-center">
            <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Sistema Online
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 transition-all hover:shadow-md">
          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-car text-xl"></i>
          </div>
          <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Viaturas Ativas</p>
          <h3 class="text-3xl font-black text-slate-900 mt-1">
            {{ resumoDados.metricas.viaturasAtivas }}/{{ resumoDados.metricas.viaturasTotal }}
          </h3>
        </div>

        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 transition-all hover:shadow-md">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-user-check text-xl"></i>
          </div>
          <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Técnicos em Campo</p>
          <h3 class="text-3xl font-black text-slate-900 mt-1">
            {{ resumoDados.metricas.tecnicosEmCampo }}
          </h3>
        </div>

        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 transition-all hover:shadow-md">
          <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <i class="fas fa-gas-pump text-xl"></i>
          </div>
          <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Consumo Médio</p>
          <h3 class="text-3xl font-black text-slate-900 mt-1">
            {{ resumoDados.metricas.consumoMedio }} <span class="text-lg font-bold">km/L</span>
          </h3>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 transition-all hover:shadow-md h-full">
          
          <div class="flex justify-between items-center mb-6">
            <h4 class="text-lg font-black text-slate-800">Atividade de Hoje</h4>
            <button class="text-xs font-bold text-indigo-600 hover:underline">Ver tudo</button>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="atividade in resumoDados.atividadesHoje" 
              :key="atividade.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div class="flex items-center gap-4">
                
                <div :class="['w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100', atividade.tipo === 'DESLOCAMENTO' ? 'text-indigo-600' : 'text-amber-600']">
                  <i :class="atividade.tipo === 'DESLOCAMENTO' ? 'fas fa-map-marker-alt' : 'fas fa-gas-pump'"></i>
                </div>
                
                <div>
                  <p class="font-black text-slate-800 text-sm">{{ atividade.prefixoViatura }} • {{ atividade.nomeTecnico }}</p>
                  <p class="text-xs text-slate-500">{{ atividade.descricao }}</p>
                </div>
              </div>
              
              <span :class="['px-3 py-1 text-[10px] font-black rounded-full', atividade.corStatus === 'EMERALD' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                {{ atividade.status }}
              </span>
            </div>
            
            <div v-if="resumoDados.atividadesHoje.length === 0" class="text-center py-4 text-slate-500 text-sm">
              Nenhuma atividade registrada hoje.
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Importa o serviço que criamos para simular a API
import { dashboardService } from '../services/dashboardService'; 

// Variáveis reativas
const resumoDados = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await dashboardService.getResumoMock(); 
    resumoDados.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar o dashboard:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Animação suave de entrada para os elementos do dashboard */
.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
<template>
  <div class="h-full flex flex-col bg-[#F8FAFC]">
    
    <div v-if="loading" class="flex flex-col justify-center items-center h-96 gap-3">
      <i class="fas fa-spinner text-4xl text-indigo-600 animate-spin"></i>
      <p class="text-indigo-600 font-bold tracking-wide">Sincronizando dados com a API do Atlaz...</p>
    </div>

    <div v-else class="fade-in space-y-8 w-full max-w-7xl mx-auto p-6 md:p-10">

      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Visão Geral da Operação</h2>
        </div>
        <div class="flex gap-3">
          <span class="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-emerald-100 flex items-center">
            <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Sistema Online
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex items-center gap-5">
          <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shrink-0"><i class="fas fa-car"></i></div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Viaturas Ativas</p>
            <h3 class="text-3xl font-black text-slate-900">
              {{ metrics.activeVehicles }}<span class="text-lg text-slate-400">/{{ metrics.totalVehicles }}</span>
            </h3>
          </div>
        </div>
        
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex items-center gap-5">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shrink-0"><i class="fas fa-user-check"></i></div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Técnicos em Campo</p>
            <h3 class="text-3xl font-black text-slate-900">{{ metrics.techniciansInField }}</h3>
          </div>
        </div>
        
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex items-center gap-5">
          <div class="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center text-2xl shrink-0"><i class="fas fa-gas-pump"></i></div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Consumo Médio</p>
            <h3 class="text-3xl font-black text-slate-900">
              {{ metrics.averageConsum || '0.0' }} <span class="text-base font-bold text-slate-400">Km/L</span>
            </h3>
          </div>
        </div>
        
        <div class="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex items-center gap-5">
          <div class="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-2xl shrink-0"><i class="fas fa-money-bill-wave"></i></div>
          <div>
            <p class="text-xs font-black text-rose-400 uppercase tracking-widest">Gasto Hoje</p>
            <h3 class="text-3xl font-black text-slate-900"><span class="text-sm font-bold text-slate-400">R$</span> {{ metrics.todayExpense || '0,00' }}</h3>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="bg-white border border-slate-100 shadow-sm rounded-[2.5rem] p-8 lg:col-span-2">
          <div class="flex justify-between items-center mb-8">
            <h4 class="text-lg font-black text-slate-800">Comparativo: KM Rodados x Viatura</h4>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Top Frota</span>
          </div>
          
          <div v-if="vehicleKmList.length === 0" class="flex items-center justify-center h-48 text-slate-400 font-medium">
            Nenhum registro de quilometragem encontrado para a frota hoje.
          </div>
          
          <div v-else class="flex items-end justify-between gap-2 h-48 mt-4 overflow-x-auto pb-2">
            <div v-for="vehicle in vehicleKmList" :key="vehicle.prefix" class="flex-1 min-w-[60px] flex flex-col items-center gap-2 h-full">
              <span class="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{{ vehicle.km }} KM</span>
              <div class="w-10 bg-slate-50 rounded-xl relative h-full flex items-end">
                <div class="w-full bg-indigo-500 rounded-xl transition-all duration-500" :style="{ height: calculatePercentage(vehicle.km) + '%' }"></div>
              </div>
              <span class="text-xs font-bold text-slate-400">{{ vehicle.prefix }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white border border-slate-100 shadow-sm rounded-[2.5rem] p-8 flex flex-col items-center justify-between">
          <h4 class="text-lg font-black text-slate-800 mb-6 w-full text-left">Status da Frota</h4>
          
          <div class="relative w-40 h-40 rounded-full flex items-center justify-center" :style="{ background: generateFleetGradient() }">
            <div class="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span class="text-2xl font-black text-slate-800">{{ metrics.totalVehicles }}</span>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total</span>
            </div>
          </div>

          <div class="w-full mt-6 space-y-2">
            <div class="flex justify-between items-center text-xs font-bold">
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-indigo-600"></span>Em Rota (Ativas)</div>
              <span>{{ metrics.activeVehicles }}</span>
            </div>
            <div class="flex justify-between items-center text-xs font-bold">
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-400"></span>Disponíveis / Paradas</div>
              <span>{{ metrics.totalVehicles}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-100 shadow-sm rounded-[2.5rem] p-8">
        <div class="flex justify-between items-center mb-8">
          <h4 class="text-xl font-black text-slate-800">Registros do Dia</h4>
          <button class="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">Ver tudo</button>
        </div>
        
        <div v-if="activities.length === 0" class="text-center py-6 text-slate-400 font-medium">
          Nenhuma atividade operacional registrada hoje.
        </div>

        <div v-else class="flex flex-col gap-4">
          <div v-for="activity in activities" :key="activity.id" 
               class="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all group">
            
            <div class="flex items-center gap-4">
              <div :class="['w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform', getIconClass(activity.type).color]">
                <i :class="getIconClass(activity.type).icone"></i>
              </div>
              <div>
                <p class="font-black text-slate-800 text-sm">
                  {{ activity.vehiclePrefix || 'Viatura' }} • {{ activity.technicianName || 'Sem técnico' }}
                </p>
                <p class="text-xs font-medium text-slate-500">{{ activity.description }}</p>
              </div>
            </div>
            
            <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider', getBadgeClass(activity.status, activity.statusColor)]">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { dashboardService } from '../services/dashboardService';

const loading = ref(true);

const metrics = ref({
  activeVehicles: 0,
  totalVehicles: 0,
  techniciansInField: 0,
  averageConsum: 0,
  todayExpense: 0
});
const activities = ref([]);
const vehicleKmList = ref([]);

const generateFleetGradient = () => {
  const total = metrics.value.totalVehicles || 1;
  const active = metrics.value.activeVehicles || 0;
  const percentageActive = (active / total) * 100;
  return `conic-gradient(#4f46e5 0% ${percentageActive}%, #94a3b8 ${percentageActive}% 100%)`;
};

const calculatePercentage = (km) => {
  if (vehicleKmList.value.length === 0) return 0;
  const maxKm = Math.max(...vehicleKmList.value.map(v => v.km));
  return maxKm > 0 ? (km / maxKm) * 100 : 0;
};

const getIconClass = (type) => {
  const t = type?.toUpperCase();
  if (t === 'ABASTECIMENTO' || t === 'REFUELING') return { icone: 'fas fa-gas-pump', color: 'text-amber-600' };
  if (t === 'DESLOCAMENTO' || t === 'DISPLACEMENT') return { icone: 'fas fa-route', color: 'text-indigo-600' };
  return { icone: 'fas fa-tools', color: 'text-rose-600' };
};

const getBadgeClass = (status, statusColor) => {
  if (statusColor) return statusColor;
  const s = status?.toUpperCase();
  if (s === 'CONCLUIDO' || s === 'SUCESSO' || s === 'COMPLETED') return 'bg-emerald-100 text-emerald-700';
  if (s === 'REGISTRADO' || s === 'PROCESSADO' || s === 'REGISTERED') return 'bg-amber-100 text-amber-700';
  if (s === 'EM ANDAMENTO' || s === 'EM_ANDAMENTO' || s === 'IN_PROGRESS') return 'bg-indigo-100 text-indigo-700 animate-pulse';
  return 'bg-rose-100 text-rose-700';
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await dashboardService.getDashboardData();
    
    if (response?.data?.data) {
      const payload = response.data.data;
      metrics.value = payload.metrics || metrics.value;
      activities.value = payload.todayActivities || [];
      vehicleKmList.value = payload.vehicleKm || [];
    }
  } catch (error) {
    console.error('Erro ao integrar as variáveis do painel:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.fade-in { animation: fadeIn 0.4s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
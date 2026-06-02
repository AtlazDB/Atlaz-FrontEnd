<template>
  <!-- Botão de Menu Mobile -->
  <button class="mobile-menu-btn" @click="openSidebar" v-if="isMobile" aria-label="Abrir menu">
    <i class="fas fa-bars"></i>
  </button>

  <!-- Overlay de fundo em telas mobile -->
  <div v-if="isMobile && isSidebarOpen" class="overlay" @click="closeSidebar"></div>

  <!-- Estrutura da Sidebar -->
  <div
    class="sidebar"
    :class="{
      'mobile-open': isMobile && isSidebarOpen,
      'desktop-sidebar': !isMobile,
    }"
  >
    <!-- Botão de Fechar Mobile -->
    <button class="close-btn" @click="closeSidebar" v-if="isMobile" aria-label="Fechar menu">
      <i class="fas fa-times"></i>
    </button>

    <!-- Cabeçalho do Perfil de Usuário -->
    <div class="perfil">
      <div class="avatar-container">
        <svg
          width="32"
          height="32"
          viewBox="0 0 77 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="profile-svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M38.3333 7.33333C31.9821 7.33333 26.8333 12.2582 26.8333 18.3333C26.8333 24.4085 31.9821 29.3333 38.3333 29.3333C44.6846 29.3333 49.8333 24.4085 49.8333 18.3333C49.8333 12.2582 44.6846 7.33333 38.3333 7.33333ZM19.1667 18.3333C19.1667 8.20812 27.7479 0 38.3333 0C48.9188 0 57.5 8.20812 57.5 18.3333C57.5 28.4585 48.9188 36.6667 38.3333 36.6667C27.7479 36.6667 19.1667 28.4585 19.1667 18.3333ZM14.484 48.2166C22.1332 44.9368 31.372 44 38.3333 44C45.2947 44 54.5334 44.9368 62.1826 48.2166C69.9696 51.5556 76.6667 57.6474 76.6667 67.8333V71.5C76.6667 76.4667 72.4684 80.6667 67.1535 80.6667H9.51313C4.19825 80.6667 0 76.4667 0 71.5V67.8333C0 57.6474 6.69704 51.5556 14.484 48.2166ZM17.6201 54.9084C11.5113 57.5277 7.66667 61.5192 7.66667 67.8333V71.5C7.66667 72.5342 8.55428 73.3333 9.51313 73.3333H67.1535C68.1124 73.3333 69 72.5342 69 71.5V67.8333C69 61.5192 65.1554 57.5277 59.0465 54.9084C52.7999 52.2299 44.7887 51.3333 38.3333 51.3333C31.878 51.3333 23.8668 52.2299 17.6201 54.9084Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h3 class="nome">{{ nome }}</h3>
      <span class="cargo">{{ cargo }}</span>
    </div>

    <!-- Divisor -->
    <div class="divider"></div>

    <!-- Links de Navegação do Menu -->
    <div class="menu-container">
      
      <!-- Visão do Técnico -->
      <template v-if="userType === 'tecnico'">
        <button class="menu" :class="{ 'active': isActiveMenu('formulario') }" @click="handleMenuClick('formulario')">
          <i class="fas fa-file-alt icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Ocorrência</span>
        </button>

        <button class="menu" :class="{ 'active': isActiveMenu('abastecimento') }" @click="handleMenuClick('abastecimento')">
          <i class="fas fa-gas-pump icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Abastecimento</span>
        </button>

        <button class="menu" :class="{ 'active': isActiveMenu('historico') }" @click="handleMenuClick('historico')">
          <i class="fas fa-history icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Histórico</span>
        </button>
      </template>

      <!-- Visão do Administrador -->
      <template v-if="userType === 'admin'">
        <button class="menu" :class="{ 'active': isActiveMenu('principal') }" @click="handleMenuClick('principal')">
          <i class="fas fa-chart-pie icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Painel Principal</span>
        </button>

        <button class="menu" :class="{ 'active': isActiveMenu('viaturas') }" @click="handleMenuClick('viaturas')">
          <i class="fas fa-car icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Viaturas</span>
        </button>

        <button class="menu" :class="{ 'active': isActiveMenu('tecnicos') }" @click="handleMenuClick('tecnicos')">
          <i class="fas fa-user-cog icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Técnicos</span>
        </button>

        <button class="menu" :class="{ 'active': isActiveMenu('relatorios') }" @click="handleMenuClick('relatorios')">
          <i class="fas fa-file-invoice-dollar icon"></i>
          <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Relatórios</span>
        </button>
      </template>
    </div>

    <!-- Botão de Logout fixado no rodapé -->
    <button @click="handleMenuClick('Login')" class="logout">
      <i class="fas fa-sign-out-alt icon"></i>
      <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Sair do Sistema</span>
    </button>
  </div>
</template>

<script>
import ExitIcon from '@/assets/icons/ExitIcon.vue'
export default {
  name: 'Sidebar',
  components: { ExitIcon },
  props: {
    nome: { type: String, default: 'Usuário' },
    cargo: { type: String, default: 'Cargo' },
    userType: {
      type: String,
      default: 'tecnico',
      validator: (value) => ['tecnico', 'admin'].includes(value),
    },
    isMinimized: { type: Boolean, default: false }
  },
  data() {
    return {
      isSidebarOpen: false,
      isMobile: false,
    }
  },
  methods: {
    openSidebar() {
      this.isSidebarOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeSidebar() {
      this.isSidebarOpen = false
      document.body.style.overflow = ''
    },
    isActiveMenu(tipo) {
      if (!this.$route) return false;
      const path = this.$route.path || '';
      const name = this.$route.name || '';

      if (tipo === 'formulario') return path.includes('formulario-tecnico');
      if (tipo === 'abastecimento') return name === 'abastecimento' || path.toLowerCase().includes('abastecimento');
      if (tipo === 'historico') return name === 'ocorrecias' || path.includes('ocorrecias');
      if (tipo === 'principal') return name === 'dashboard' || path.includes('dashboard');
      if (tipo === 'viaturas') return name === 'viaturas' || path.includes('viaturas');
      if (tipo === 'tecnicos') return name === 'tecnicos' || path.includes('tecnicos');
      if (tipo === 'relatorios') return name === 'relatorios' || path.includes('relatorios');

      return false;
    },
    handleMenuClick(tipo) {
      this.closeSidebar() 
      if (tipo === 'formulario') this.$router.push('/formulario-tecnico')
      else if (tipo === 'abastecimento') this.$router.push('/abastecimento')
      else if (tipo === 'principal') this.$router.push({ name: 'dashboard' })
      else if (tipo === 'viaturas') this.$router.push({ name: 'viaturas' })
      else if (tipo === 'relatorios') this.$router.push({ name: 'relatorios' })
      else if (tipo === 'Login') this.$router.push({ name: 'Login' })
      else if (tipo === 'tecnicos') this.$router.push({ name: 'tecnicos' })
      else if (tipo === 'historico') this.$router.push({ name: 'ocorrecias' })
    },
    checkMobile() {
      const wasMobile = this.isMobile
      this.isMobile = window.innerWidth <= 768
      if (this.isMobile && !wasMobile) {
        this.isSidebarOpen = false
        document.body.style.overflow = ''
      }
    },
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
    document.body.style.overflow = ''
  },
}
</script>

<style scoped>
/* Botão do Hamburguer Mobile */
.mobile-menu-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  background-color: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background-color: #f8fafc;
  color: #4f46e5;
}

/* Fundo Escuro Atrás da Sidebar Mobile */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 998;
}

/* Base Comum da Sidebar (Paleta Slate Premium) */
.sidebar {
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 24px 16px;
  height: 100vh;
  box-sizing: border-box;
}

/* Configurações Desktop Estrito */
.sidebar.desktop-sidebar {
  position: sticky;
  top: 0;
  width: 220px;           
  min-width: 220px;       
  max-width: 220px;     
  flex-shrink: 0;         
  z-index: 100;
  border-right: 1px solid #1e293b;
  overflow-y: auto;       
}

/* Configurações Mobile Estrito */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    z-index: 999;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  }

  .sidebar.mobile-open {
    left: 0;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: #1e293b;
    border: none;
    color: #94a3b8;
    font-size: 16px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background-color: #334155;
    color: #ffffff;
  }
}

/* Header de Perfil do Usuário */
.perfil {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.avatar-container {
  width: 56px;
  height: 56px;
  background-color: #1e293b;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  border: 1px solid #334155;
}

.nome {
  margin: 14px 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cargo {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}

/* Divisor elegante */
.divider {
  width: 85%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #1e293b 50%, transparent);
  margin-bottom: 24px;
}

/* Container flexível dos botões para organizar o layout */
.menu-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1; 
  overflow-y: auto;
}

/* Botões Padrão do Menu */
.menu {
  background-color: transparent;
  color: #94a3b8;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.menu .icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  transition: transform 0.2s ease;
}

.menu:hover {
  background-color: #1e293b;
  color: #ffffff;
}

.menu:hover .icon {
  transform: scale(1.1);
}

/* Botão Ativo Dinâmico (Sinalização Premium) */
.menu.active {
  color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.08);
  border-left: 3px solid #38bdf8;
  padding-left: 13px; 
  font-weight: 700;
}

.menu.active .icon {
  transform: scale(1.1);
}

/* Botão de Logout Moderno (Sem position fixed) */
.logout {
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.logout:hover {
  background-color: #ef4444; /* Vermelho alerta no hover */
  border-color: #ef4444;
  color: #ffffff;
}

.hidden {
  display: none;
}
</style>
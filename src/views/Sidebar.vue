<template>
  <button class="mobile-menu-btn" @click="openSidebar" v-if="isMobile">☰</button>

  <div v-if="isMobile && isSidebarOpen" class="overlay" @click="closeSidebar"></div>

  <div
    class="sidebar"
    :class="{
      'mobile-open': isMobile && isSidebarOpen,
      'desktop-sidebar': !isMobile,
    }"
  >
    <button class="close-btn" @click="closeSidebar" v-if="isMobile">✕</button>

    <div class="perfil">
      <img /><svg
        width="77"
        height="81"
        viewBox="0 0 77 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M38.3333 7.33333C31.9821 7.33333 26.8333 12.2582 26.8333 18.3333C26.8333 24.4085 31.9821 29.3333 38.3333 29.3333C44.6846 29.3333 49.8333 24.4085 49.8333 18.3333C49.8333 12.2582 44.6846 7.33333 38.3333 7.33333ZM19.1667 18.3333C19.1667 8.20812 27.7479 0 38.3333 0C48.9188 0 57.5 8.20812 57.5 18.3333C57.5 28.4585 48.9188 36.6667 38.3333 36.6667C27.7479 36.6667 19.1667 28.4585 19.1667 18.3333ZM14.484 48.2166C22.1332 44.9368 31.372 44 38.3333 44C45.2947 44 54.5334 44.9368 62.1826 48.2166C69.9696 51.5556 76.6667 57.6474 76.6667 67.8333V71.5C76.6667 76.4667 72.4684 80.6667 67.1535 80.6667H9.51313C4.19825 80.6667 0 76.4667 0 71.5V67.8333C0 57.6474 6.69704 51.5556 14.484 48.2166ZM17.6201 54.9084C11.5113 57.5277 7.66667 61.5192 7.66667 67.8333V71.5C7.66667 72.5342 8.55428 73.3333 9.51313 73.3333H67.1535C68.1124 73.3333 69 72.5342 69 71.5V67.8333C69 61.5192 65.1554 57.5277 59.0465 54.9084C52.7999 52.2299 44.7887 51.3333 38.3333 51.3333C31.878 51.3333 23.8668 52.2299 17.6201 54.9084Z"
          fill="white"
        />
      </svg>

      <h3 class="nome">{{ nome }}</h3>
      <span class="cargo">{{ cargo }}</span>
    </div>

    <button v-if="userType === 'tecnico'" class="menu" @click="handleMenuClick('formulario')">
      <span class="icon">📄</span>
      <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Formulário</span>
    </button>

    <button
      v-if="userType === 'admin'"
      class="menu menu-principal"
      @click="handleMenuClick('principal')"
    >
      <span class="icon">📊</span>
      <span class="text_btn" :class="{ hidden: isMinimized && !isMobile }">Principal</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    nome: {
      type: String,
      default: 'Usuário',
    },
    cargo: {
      type: String,
      default: 'Cargo',
    },
    userType: {
      type: String,
      default: 'tecnico',
      validator: (value) => ['tecnico', 'admin'].includes(value),
    },
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

    handleMenuClick(tipo) {
      if (tipo === 'formulario') {
        this.$emit('abrirFormulario')
      } else if (tipo === 'principal') {
        this.toggleSidebar()
        this.$emit('abrirPrincipal')
      }
    },
    checkMobile() {
      const wasMobile = this.isMobile
      this.isMobile = window.innerWidth <= 768

      if (this.isMobile && !wasMobile) {
        this.isSidebarOpen = false
        document.body.style.overflow = ''
      }

      if (!this.isMobile && wasMobile) {
        document.body.style.overflow = ''
      }
    },
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
    document.body.style.overflow = ''
  },
}
</script>

<style scoped>
.mobile-menu-btn {
  position: fixed;
  top: 5px;
  left: 10px;
  background-color: transparent;
  color: #003366;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

.sidebar.desktop-sidebar {
  position: sticky;
  top: 0;
  width: 240px;
  background-color: #003366;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  transition: none;
  overflow-y: auto;
  height: 100vh;
  z-index: 100;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    background-color: #003366;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
  }

  .sidebar.mobile-open {
    left: 0;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  .perfil {
    margin-top: 20px;
  }

  .menu {
    width: 90%;
    justify-content: center;
    margin-top: 30px;
  }
}

@media (min-width: 769px) {
  .close-btn {
    display: none;
  }
  .mobile-menu-btn {
    display: none;
  }
  .overlay {
    display: none;
  }
}

.perfil {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.nome {
  margin-top: 20px;
  font-size: 15px;
  white-space: nowrap;
}

.cargo {
  font-size: 13px;
  color: #b1bdc8;
  white-space: nowrap;
}

.menu {
  margin-top: 50px;
  background-color: #7aa6cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.menu:hover {
  background-color: #7aa6cc;
  transform: translateY(-2px);
}
</style>

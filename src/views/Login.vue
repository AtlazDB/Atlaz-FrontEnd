<template>

<div class="main">
    <div class="card-login">
     <label class="email-label">Email</label>
     <input
          type="text"
          class="campo-input"
          placeholder="Informe se email"
        >
     <label class="campo-label">Senha</label>
     <input
          type="text"
          class="campo-input"
          placeholder="Informe sua senha"
        >
            <button
               type="button"
               class="btn-entrar">
                 Entrar
            </button>
          <p>Esqueceu sua senha? <a href="#">Redefinir Senha</a></p>
</div>
</div>
</template>

<style scoped>

.main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0b2359, #8ba9cc);
}

.card-login {
  background: white;
  border-radius: 18px;
  padding: 48px 52px 40px;
  width: 420px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-entrar{
    background: #003366;
    color:white;
    border: none;
   border-radius: 8px;
   padding: 15px;
   width: 100%;
   cursor: pointer;
}

.campo-input{
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
</style>
<template>
  <q-page style="background-color:#0D1117">
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center text-white">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          label-color="white"
          white
          input-class="text-white"
          class="q-input--white"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10">
        <q-input
          label="Senha"
          v-model="form.password"
          type="password"
          label-color="white"
          input-class="text-white"
          class="q-input--white"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-btn class="full-width q-gutter-y-md" label="Login"
          color="primary"
          outline
          type="submit"></q-btn>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10">
        <q-btn class="full-width q-gutter-y-md" label="Cadastrar"
          color="primary"
          flat
          :to="{ name: 'register' }"></q-btn>
      </div>
     <div class="col-md-4 col-sm-6 col-xs-10">
        <q-btn class="full-width q-gutter-y-md" label="Esquecia a senha"
          color="primary"
          flat
          :to="{ name: 'forgot-password' }"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

const router = useRouter()
const { login, isLoggedIn } = useAuthUser()

const { notifySuccess, notifyError } = useNotify()

const form = ref({
  email: '',
  password: ''
})

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' })
  }
})

const handleLogin = async () => {
  try {
    await login(form.value)
    router.push({ name: 'me' }) // Agora redireciona para o caminho correto
    notifySuccess('Login realizado com sucesso.')
  } catch (error) {
    notifyError('Login inválido, revise seu email e senha e tente novamente.')
  }
}
</script>

<style scoped>
.q-form {
  max-width: 600px; /* Limita a largura máxima do formulário para centralizar e manter um layout mais coeso */
  margin: 0 auto; /* Centraliza o formulário horizontalmente */
}

.q-input--white {
  margin-bottom: 0.4rem; /* Adiciona espaçamento entre os campos de entrada */
}

.q-btn {
  margin-top: 0.2rem; /* Adiciona espaçamento acima dos botões */
}

.q-btn.full-width {
  margin-bottom: 0.1rem; /* Adiciona espaçamento abaixo dos botões para separar os botões um do outro */
}
</style>

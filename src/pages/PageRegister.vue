<template>
  <q-page class="padding" style="background-color:#0D1117">
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center text-white">Cadastrar</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
          label-color="white"
          input-class="text-white"
          class="q-input--white"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'O nome é obrigatório.']"
        />
        <q-input
          label="Email"
          v-model="form.email"
          label-color="white"
          input-class="text-white"
          class="q-input--white"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'O email é obrigatório']"
           type="email"
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
           :rules="[ val => val && val.length >= 6 || 'A senha é obrigatório.']"
        />
        <q-btn class="full-width q-pt-md q-gutter-y-sm" label="Cadastrar"
          color="primary"
          outline
          type="submit"
        ></q-btn>

        <q-btn class="full-width q-pt-md" label="Voltar"
          color="dark"
          rounded
          flat
          :to="{ name:'login' }"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

defineOptions({
  name: 'PageRegister'
})

const router = useRouter()
const { register } = useAuthUser()
const { notifySuccess, notifyError } = useNotify()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleRegister = async () => {
  try {
    await register(form.value)
    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
    notifySuccess('Cadastro realizado com sucesso, foi enviado para você o email de confirmação')
  } catch (error) {
    notifyError('O cadastro não foi realizado, revise seus dados e tente novamente.')
  }
}
</script>

<style scoped>
.q-input--white .q-field__control {
  color: white;
  font-weight: 300;
}

.q-input--white .q-field__label {
  color: white;
  font-weight: 300;
}
</style>

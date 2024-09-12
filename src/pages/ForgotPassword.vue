<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center"> Recuperar senha </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Email"
          v-model="email"
          lazy-rules
           :rules="[ val => val && val.length > 0 || 'O email é obrigatório']"
          type="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar nova senha"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/useNotify'
// Composables
const { sendPasswordResetEmail } = useAuthUser()
const { notifySuccess, notifyError } = useNotify()
// Reactive state
const email = ref('')

// Methods
const handleForgotPassword = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    notifySuccess(`Link de recuperação de senha enviado para: ${email.value}`)
  } catch (error) {
    notifyError('Erro ao recuperar sua senha, revise seu email e tente novamente.')
  }
}
</script>

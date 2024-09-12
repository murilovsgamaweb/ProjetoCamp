<template>
  <q-page class="padding" style="background-color: #0D1117">
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center text-white">Recuperar senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nova senha"
          v-model="form.password"
          label-color="white"
          input-class="text-white"
          class="q-input--white"
          type="password"
           lazy-rules
           :rules="[ val => val && val.length >= 6 || 'A senha é obrigatório.']"
        />
      </div>
      <q-btn
        class="full-width q-pt-md q-gutter-y-sm"
        label="Salvar nova senha"
        color="primary"
        outline
        type="submit"
      />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter, useRoute } from 'vue-router'
import useNotify from 'src/composables/useNotify'

const { resetPassword } = useAuthUser()

const route = useRoute()
const router = useRouter()
const { notifySuccess, notifyError } = useNotify()
const token = route.query.token || ''
const form = ref({
  password: ''
})

const handlePasswordReset = async () => {
  if (!token) {
    console.error('Token is missing')
    return
  }

  try {
    await resetPassword(token, form.value.password)
    router.push({ name: 'login' })
    notifySuccess('Sua senha foi alterada com sucesso.')
  } catch (error) {
    console.error('Error resetting password:', error)
    notifyError('Erro ao alterar sua senha.')
  }
}
</script>

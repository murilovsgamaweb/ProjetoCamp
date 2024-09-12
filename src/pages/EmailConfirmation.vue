<template>
  <q-page class="padding text-body1" style="background-color:#0D1117; color: #ffffff;">
    <p class="text-body1">Obrigado por se cadastrar</p>
    <p>Por favor, confirme seu email. <strong>{{ email }}</strong></p>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Usa o hook useRoute para acessar a rota atual
const route = useRoute()

// Obtém o valor do parâmetro de consulta 'email' da URL
const email = route.query.email
</script>

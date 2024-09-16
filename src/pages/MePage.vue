<template>
  <q-page class="flex flex-center" style="background-color:#0D1117">
    <div class="q-pa-md row items-start q-gutter-md">

      <!-- Container personalizado para o cumprimento do usuário -->
      <q-card class="welcome-card">
        <q-card-section class="row no-wrap items-center">
          <q-avatar size="56px" class="q-mr-sm">
            <q-icon name="account_circle" size="40px" color="white" />
          </q-avatar>
          <div>
            <p class="welcome-text">Olá, {{ user.user_metadata.name }}</p>
          </div>
        </q-card-section>
      </q-card>

      <!-- Cards com botão "Criar" -->
      <div v-for="(card, index) in cards" :key="index" class="q-mt-md q-pa-md">
        <q-card class="my-card">
          <img :src="card.img" />

          <q-card-section>
            <div class="text-h6">{{ card.title }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p>{{ card.text }}</p>
          </q-card-section>

          <!-- Botão "Criar" -->
          <q-card-actions align="right">
            <q-btn
            label="Criar"
            color="primary"
            @click="handleCreate(card.title)"
            :to="{ name: 'criarCamp', query: { title: card.title } }"
          />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import useAuthUser from 'src/composables/useAuthUser'

defineOptions({
  name: 'PageMe'
})

const { user } = useAuthUser()

// Lista de cards com informações
const cards = [
  {
    img: 'https://cdn.quasar.dev/img/mountains.jpg',
    title: 'Fase de grupos + Mata-Mata',
    text: 'Texto do card 1',
    mode: 'Times'
  },
  {
    img: 'https://cdn.quasar.dev/img/mountains.jpg',
    title: 'Pontos corridos',
    text: 'Texto do card 2',
    mode: 'Seleções'
  },
  {
    img: 'https://cdn.quasar.dev/img/mountains.jpg',
    title: 'Mata-Mata',
    text: 'Texto do card 3',
    mode: 'Times'
  }
]

// Função que será chamada quando o botão "Criar" for clicado
const handleCreate = (index) => {
  console.log(`Botão "Criar" clicado no card ${index + 1}`)
}
</script>

<style scoped>
.welcome-card {
  max-width: 400px;
  margin: 0 auto;
  background-color: #1e2a35;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.welcome-text {
  font-size: 1.4rem;
  color: white;
  font-weight: bold;
}

.q-avatar {
  background-color: #0d47a1;
}

.my-card {
  background-color: #1e2a35;
  color: white;
  border-radius: 8px;
}

p {
  color: #ccc;
}
</style>

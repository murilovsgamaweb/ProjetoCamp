<template>
  <q-page class="page-container">
    <!-- Centraliza o container de boas-vindas no topo -->
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <q-card class="welcome-card">
        <q-card-section class="row no-wrap items-center justify-center">
          <q-avatar size="56px" class="q-mr-sm">
            <q-icon name="account_circle" size="40px" color="white" />
          </q-avatar>
          <div>
            <p class="welcome-text">Olá, {{ user.user_metadata.name }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Alinha os cards lado a lado -->
    <div class="card-container row justify-center q-gutter-md">
      <div v-for="(card, index) in cards" :key="index" class="q-pa-md col-12 col-sm-6 col-md-4">
        <q-card class="my-card">
          <img :src="card.img" alt="Imagem do card" class="card-image" />
          <q-card-section>
            <div class="text-h6">{{ card.title }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p>{{ card.text }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Criar"
              color="primary"
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
    img: '/images/fasegrupos.jpg',
    title: 'Fase de grupos + Mata-Mata',
    text: 'Nesse formato, as equipes se enfrentam em eliminatórias diretas. Quem perde é eliminado, e quem vence avança até a final.',
    mode: 'Times'
  },
  {
    img: '/images/pontos-corridos.png',
    title: 'Pontos corridos',
    text: 'Todas as equipes se enfrentam em rodadas, acumulando pontos. A equipe com o maior número de pontos ao final de todas as rodadas é declarada campeã.',
    mode: 'Seleções'
  },
  {
    img: '/images/mata-mata.jpg',
    title: 'Mata-Mata',
    text: 'As equipes são inicialmente divididas em grupos, onde jogam entre si. As melhores classificadas avançam para a fase de mata-mata, onde o formato de eliminação direta define o campeão.',
    mode: 'Times'
  }
]
</script>

<style scoped>
/* Página centralizada com espaço no topo */
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #0D1117;
  padding-top: 30px; /* Espaço no topo para centralizar o container */
}

.welcome-card {
  max-width: 400px;
  margin-bottom: 20px; /* Espaçamento entre o container e os cards */
  background-color: #1e2a35;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.welcome-text {
  font-size: 1.4rem;
  color: white;
  font-weight: bold;
}

.q-avatar {
  background-color: #0d47a1;
}

/* Container para centralizar os cards */
.card-container {
  max-width: 1200px;
  width: 100%;
}

.my-card {
  background-color: #1e2a35;
  color: white;
  border-radius: 8px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px 8px 0 0;
}

p {
  color: #ccc;
}
</style>

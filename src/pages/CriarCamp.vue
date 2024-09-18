<template>
  <q-page class="flex flex-center q-pa-md" style="background-color:#1e2a35">
    <q-card class="q-pa-md" style="max-width: 500px; width: 100%; background-color: #1e2a35; color: white;">
      <q-card-section>
        <div class="text-h6">Criar Campeonato: {{ cardTitle }}</div>
      </q-card-section>

      <q-form @submit="handleSubmit">
        <!-- Nome do Campeonato -->
        <q-input
          v-model="championshipName"
          filled
          label="Nome do Campeonato"
          class="q-mb-md"
          :rules="[val => !!val || 'O nome do campeonato é obrigatório']"
        />

        <!-- Modo (readonly) -->
        <q-input
          v-model="cardTitle"
          filled
          label="Modo"
          readonly
          class="q-mb-md"
        />

        <!-- Seletor para Times ou Seleções -->
        <q-select
          v-model="selectedMode"
          label="Escolha entre Times ou Seleções"
          :options="['Times', 'Seleções']"
          filled
          class="q-mb-md"
          @update:model-value="handleModeChange"
          :rules="[val => !!val || 'Por favor, selecione um modo']"
        />

        <!-- Seletor de Ligas e Times -->
        <q-select
          v-if="selectedMode === 'Times'"
          v-model="selectedLeague"
          :options="Object.keys(teamsData.times.Europeus)"
          label="Escolha uma Liga"
          filled
          class="q-mb-md"
          @update:model-value="handleLeagueChange"
        />

        <q-select
          v-if="selectedLeague"
          v-model="selectedTeam"
          :options="getTeamsForSelectedLeague"
          label="Escolha um time"
          filled
          class="q-mb-md"
          multiple
        />

        <!-- Seletor de Continentes e Seleções -->
        <q-select
          v-if="selectedMode === 'Seleções'"
          v-model="selectedContinent"
          :options="Object.keys(teamsData.selecoes)"
          label="Escolha um Continente"
          filled
          class="q-mb-md"
          @update:model-value="handleContinentChange"
        />

        <q-select
          v-if="selectedContinent"
          v-model="selectedSelection"
          :options="getSelectionsForSelectedContinent"
          label="Escolha uma seleção"
          filled
          class="q-mb-md"
          multiple
        />

        <!-- Campo de texto para exibir os Times ou Seleções Selecionados -->
        <q-input
          v-model="selectedItems"
          filled
          label="Times/Seleções Selecionados"
          class="q-mb-md"
          readonly
        />

        <!-- Botões -->
        <q-btn type="submit" label="Criar" color="primary" class="full-width q-mb-md" />
        <q-btn label="Voltar" color="black" class="full-width" @click="$router.go(-1)" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// Importando o JSON da pasta composables
import teamsData from '../composables/TimesESelecoes.json'

const championshipName = ref('')
const selectedMode = ref(null)
const selectedLeague = ref(null)
const selectedTeam = ref([])
const selectedContinent = ref(null)
const selectedSelection = ref([])

// Título vindo do card
const cardTitle = ref('')

// Inicializa o título ao montar o componente
const route = useRoute()
onMounted(() => {
  cardTitle.value = route.query.title || 'Título do Card Não Encontrado'
})

// Computed properties
const getTeamsForSelectedLeague = computed(() => {
  if (selectedLeague.value) {
    return teamsData.times.Europeus[selectedLeague.value] || []
  }
  return []
})

const getSelectionsForSelectedContinent = computed(() => {
  if (selectedContinent.value) {
    return teamsData.selecoes[selectedContinent.value] || []
  }
  return []
})

// Campo de texto que exibirá os itens selecionados
const selectedItems = ref('')

// Função para lidar com a mudança no seletor de modo
const handleModeChange = () => {
  selectedLeague.value = null
  selectedTeam.value = []
  selectedContinent.value = null
  selectedSelection.value = []
}

// Observa as mudanças nos times e seleções selecionados para atualizar o campo de texto
watch([selectedTeam, selectedSelection], () => {
  const items = selectedMode.value === 'Times' ? selectedTeam.value : selectedSelection.value
  selectedItems.value = items.join(', ')
})
</script>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  height: 100vh;
}

.q-card {
  background-color: #1e2a35;
  color: white;
  border-radius: 8px;
}

.full-width {
  width: 100%;
}

.q-input, .q-select {
  background-color: #2e3b47;
  color: white; /* Faz com que o texto digitado seja branco */
}

.q-input__inner, .q-select__inner {
  color: white !important; /* Garante que o texto interno seja branco */
}

.q-field__label {
  color: white !important; /* Garante que o rótulo (label) seja branco */
}

/* Para as opções do q-select */
.q-item__label {
  color: white !important; /* Faz com que as opções do select sejam brancas */
}

/* Placeholder em branco */
.q-placeholder {
  color: white !important;
}
</style>

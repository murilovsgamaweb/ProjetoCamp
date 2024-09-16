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
          :options="Object.keys(selectionsData.seleções)"
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

        <!-- Exibição dos Times ou Seleções Selecionados -->
        <q-card-section v-if="selectedMode === 'Times' && selectedTeam.length > 0">
          <div class="text-h6">Times Selecionados:</div>
          <ul>
            <li v-for="team in selectedTeam" :key="team">{{ team }}</li>
          </ul>
        </q-card-section>

        <q-card-section v-if="selectedMode === 'Seleções' && selectedSelection.length > 0">
          <div class="text-h6">Seleções Selecionadas:</div>
          <ul>
            <li v-for="selection in selectedSelection" :key="selection">{{ selection }}</li>
          </ul>
        </q-card-section>

        <!-- Botões -->
        <q-btn type="submit" label="Criar" color="primary" class="full-width q-mb-md" />
        <q-btn label="Voltar" color="black" class="full-width" @click="$router.go(-1)" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Estado do formulário
const championshipName = ref('')
const selectedMode = ref(null)
const selectedLeague = ref(null)
const selectedTeam = ref([])
const selectedContinent = ref(null)
const selectedSelection = ref([])

// Dados do JSON
const teamsData = {
  times: {
    Europeus: {
      Inglaterra: ['Arsenal', 'Bournemouth', 'Brighton', 'Chelsea', 'Crystal Palace', 'Everton', 'Huddersfield', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United', 'Southampton', 'Tottenham Hotspur', 'West Bromwich Albion', 'West Ham United'],
      Espanha: ['Alavés', 'Athletic Club', 'Atlético de Madrid', 'Barcelona', 'Celta de Vigo', 'Deportivo La Coruña', 'Eibar', 'Espanyol', 'Getafe', 'Girona', 'Las Palmas', 'Leganés', 'Real Madrid', 'Real Sociedad', 'Sevilla', 'Valencia', 'Villarreal'],
      Alemanha: ['Augsburg', 'Bayern de Munique', 'Bayer Leverkusen', 'Borussia Dortmund', 'Borussia Mönchengladbach', 'Eintracht Frankfurt', 'Freiburg', 'Hamburger SV', 'Hannover 96', 'Hoffenheim', 'Köln', 'Leipzig', 'Mainz', 'Schalke', 'Stuttgart', 'Wolfsburg'],
      Itália: ['Atalanta', 'Bologna', 'Cagliari', 'Chievo Verona', 'Empoli', 'Fiorentina', 'Genoa', 'Inter de Milão', 'Juventus', 'Lazio', 'Milan', 'Napoli', 'Roma', 'Sampdoria', 'Sassuolo', 'Torino'],
      França: ['Angers', 'Bordeaux', 'Caen', 'Dijon', 'Lille', 'Lyon', 'Marseille', 'Monaco', 'Montpellier', 'Nantes', 'Nice', 'Paris Saint-Germain', 'Rennes', 'Saint-Étienne', 'Toulouse'],
      Outros: ['Celtic', 'Dinamo Zagreb', 'Red Bull Salzburg']
    },
    Brasileiros: ['Atlético Mineiro', 'Atlético Paranaense', 'Botafogo', 'Cruzeiro', 'Flamengo', 'Fluminense', 'Grêmio', 'Internacional', 'Palmeiras', 'Santos', 'São Paulo']
  },
  seleções: {
    Américas: ['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Costa Rica', 'Cuba', 'Equador', 'El Salvador', 'Estados Unidos', 'Guatemala', 'Honduras', 'México', 'Panamá', 'Paraguai', 'Peru', 'Uruguai', 'Venezuela'],
    Europa: ['Alemanha', 'Andorra', 'Armenia', 'Áustria', 'Bélgica', 'Bósnia e Herzegovina', 'Bulgária', 'Chipre', 'Croácia', 'Dinamarca', 'Escócia', 'Eslováquia', 'Eslovênia', 'Espanha', 'Estônia', 'Finlândia', 'França', 'Geórgia', 'Grécia', 'Hungria', 'Islândia', 'Irlanda', 'Irlanda do Norte', 'Itália', 'Kazakhstan', 'Lituânia', 'Luxemburgo', 'Malta', 'Moldávia', 'Montenegro', 'Noruega', 'País de Gales', 'Polônia', 'Portugal', 'República Checa', 'Romênia', 'Rússia', 'San Marino', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia'],
    África: ['Argélia', 'Angola', 'Camarões', 'Costa do Marfim', 'Egito', 'Guiné', 'Marrocos', 'Mauritânia', 'Nigéria', 'Senegal', 'Togo'],
    Ásia: ['Arábia Saudita', 'Austrália', 'China', 'Coreia do Norte', 'Coreia do Sul', 'Irã', 'Iraque', 'Jordânia', 'Japão', 'Oman', 'Qatar', 'Síria', 'Uzbequistão'],
    Oceania: ['Nova Zelândia', 'Ilhas Salomão']
  }
}

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
    return teamsData.seleções[selectedContinent.value] || []
  }
  return []
})

// Função para lidar com a mudança no seletor de modo
const handleModeChange = () => {
  selectedLeague.value = null
  selectedTeam.value = []
  selectedContinent.value = null
  selectedSelection.value = []
}

// Função para lidar com a mudança na liga
const handleLeagueChange = () => {
  selectedTeam.value = []
}

// Função para lidar com a mudança no continente
const handleContinentChange = () => {
  selectedSelection.value = []
}

// Função para lidar com o envio do formulário
const handleSubmit = () => {
  console.log('Nome do Campeonato:', championshipName.value)
  console.log('Modo:', selectedMode.value)
  console.log('Liga:', selectedLeague.value)
  console.log('Times Selecionados:', selectedTeam.value)
  console.log('Continente:', selectedContinent.value)
  console.log('Seleções Selecionadas:', selectedSelection.value)
}
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
  color: white;
}
</style>

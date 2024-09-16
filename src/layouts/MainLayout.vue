<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$q.platform.is.desktop && !$q.platform.is.mobile">
      <q-toolbar>
        <q-toolbar-title>
          Campeonatos WebSupply
        </q-toolbar-title>
        <q-btn-dropdown
          flat
          label="Menu"
          icon="person"
          v-model="dropdownOpen"
        >
          <q-list>
          </q-list>
          <essential-link
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          >
          </essential-link>
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer v-if="$q.platform.is.mobile">
      <q-toolbar>
        <q-toolbar-title>
          Campeonatos WebSupply
        </q-toolbar-title>
        <q-btn-dropdown
          flat
          label="Menu"
          icon="person"
          v-model="dropdownOpen"
        >
          <q-list>
            <q-item-label>
              Menu
            </q-item-label>
          </q-list>
          <essential-link
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          >
          </essential-link>
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import useAuthUser from 'src/composables/useAuthUser'
import EssentialLink from 'src/components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const router = useRouter()

const { logout } = useAuthUser()

const handleLogout = async () => {
  $q.dialog({
    title: 'Sair',
    message: 'Você realmente quer sair?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
    router.push({ name: 'login' })
  })
}
</script>

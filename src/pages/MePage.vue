<template>
  <q-page class="flex flex-center"
  style="background-color:#0D1117">
   <div v-if="user">
    <p>Olá {{user.user_metadata.name}}</p>
   </div>
  </q-page>
</template>

<script setup>

import useAuthUser from 'src/composables/useAuthUser'

defineOptions({
  name: 'PageMe'
})

const { user } = useAuthUser()
</script>

<style scoped>
p{
  color: white;
}
</style>

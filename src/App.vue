<template>
  <v-app>
    <MainBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import MainBar from '@/components/MainBar'

export default {
  name: 'App',
  components: {
    MainBar
  }
}
</script>

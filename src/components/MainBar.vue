<template>
  <div>
    <v-app-bar dense elevation="4">
      <v-toolbar-title>
        <router-link to="/" tag="button" class="d-flex align-center">
          <v-icon class="go-back mr-3">mdi-home</v-icon>
          KeyProd
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template #activator="{on, attrs}">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="locale in locales" :key="locale.key"
                       @click="() => $i18n.locale = locale.key">
            <v-list-item-title>
              {{ locale.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      locales: [
        { key: 'fr', label: this.$t('locales.fr.label') },
        { key: 'en', label: this.$t('locales.en.label') }
      ]
    }
  }
}
</script>

<style lang="scss">
.router-link-exact-active .go-back {
  display: none!important;
}
</style>

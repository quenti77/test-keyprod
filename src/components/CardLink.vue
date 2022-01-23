<template>
  <router-link :to="to" tag="div">
    <v-btn text>
      <span class="mr-3">
        <slot />
      </span>
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </router-link>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    icon: String
  }
}
</script>

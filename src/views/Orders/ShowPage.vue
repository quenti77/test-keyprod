<template>
  <v-container>
    <v-row class="pb-5">
      <v-col>
        <h3 class="text-center text-h3 mt-3 mb-5">
          <span>{{ $t('orders.show.title', { ref: orderByRouteParam.ref }) }}</span>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'orderById'
    ]),
    orderByRouteParam () {
      return this.orderById(this.$route.params.orderId)
    }
  }
}
</script>

<template>
  <v-container>
    <v-row class="pb-5">
      <v-col>
        <h3 class="text-center text-h3 mt-3 mb-5">
          <span>{{ $t('orders.index.title') }}</span>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :items="orders" :headers="headers" :items-per-page="5"
                      sort-by="ref" class="elevation-2">
          <template #[`item.client`]="{ item }">
            <strong>{{ getClientName(item) }}</strong>
            <br>
            <small>
              <em>{{ getClientEmail(item) }}</em>
            </small>
          </template>
          <template #[`item.orderState`]="{ item }">
            <v-chip class="ma-2" :color="getOrderStateColor(item)">
              {{ getOrderStateLabel(item) }}
            </v-chip>
          </template>
          <template #[`item.products`]="{ item }">
            <strong>
              {{ $tc('orders.index.products.type', item.products.length, { count: item.products.length }) }}
            </strong>
            <br>
            <small>
              <em>
                {{ $tc(
                  'orders.index.products.quantity',
                  getTotalProducts(item),
                  { count: getTotalProducts(item) }
                ) }}
              </em>
            </small>
          </template>
          <template #[`item.actions`]="{ item }">
            <router-link :to="{name: 'orderShow', params: { orderId: item.id }}" tag="div">
              <v-btn x-small class="py-4">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </router-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { headers, orderStates } from '@/configs/OrderDataTable'

export default {
  data () {
    return {
      headers
    }
  },
  computed: {
    ...mapGetters([
      'orders'
    ])
  },
  methods: {
    getClientName ({ client }) {
      return client.name
    },
    getClientEmail ({ client }) {
      return client.email
    },
    getOrderStateColor ({ orderState }) {
      return orderStates[orderState].color
    },
    getOrderStateLabel ({ orderState }) {
      return orderStates[orderState].label
    },
    getTotalProducts ({ products }) {
      return products.reduce((prev, product) => prev + product.quantity, 0)
    }
  }
}
</script>

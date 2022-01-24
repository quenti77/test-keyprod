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
        <v-data-table :items="transformOrders" :headers="headers" :items-per-page="5"
                      sort-by="ref" class="elevation-2">
          <template #[`item.client`]="{ item }">
            <strong>{{ item.client.name }}</strong>
            <br>
            <small>
              <em>{{ item.client.email }}</em>
            </small>
          </template>
          <template #[`item.orderState`]="{ item }">
            <v-chip class="my-2" small :color="item.orderState.color">
              {{ item.orderState.label }}
            </v-chip>
          </template>
          <template #[`item.products`]="{ item }">
            <strong>
              {{ $tc('orders.index.products.type', item.productCount, { count: item.productCount }) }}
            </strong>
            <br>
            <small>
              <em>
                {{ $tc('orders.index.products.quantity', item.productTotal, { count: item.productTotal }) }}
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
    ]),
    transformOrders () {
      return this.orders.map(({ id, ref, client, products, orderState }) => {
        return {
          id,
          ref,
          client,
          orderState: orderStates[orderState],
          productCount: products.length,
          productTotal: this.getTotalProducts(products)
        }
      })
    }
  },
  methods: {
    getTotalProducts (products) {
      return products.reduce((prev, product) => prev + product.quantity, 0)
    }
  }
}
</script>

<template>
  <v-container>
    <v-row class="pb-5">
      <v-col>
        <h3 class="text-center text-h3 mt-3 mb-5">
          <span v-if="orderByRouteParam">
            {{ $t('orders.show.title', { ref: orderByRouteParam.ref }) }}
          </span>
          <span v-if="orderByRouteParam === undefined">
            {{ $t('orders.show.errors.not_found.title') }}
          </span>
        </h3>
      </v-col>
    </v-row>
    <v-row v-if="orderByRouteParam === undefined">
      <v-col class="text-center text-h5">
        <p>{{ $t('orders.show.errors.not_found.description') }}</p>
        <router-link to="/orders" tag="div">
          <v-btn>
            <v-icon class="mr-2">mdi-arrow-left-bold</v-icon>
            {{ $t('orders.show.back.link') }}
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row v-if="orderByRouteParam">
      <v-col>
        <router-link to="/orders" tag="div" class="mb-5">
          <v-btn>
            <v-icon class="mr-2">mdi-arrow-left-bold</v-icon>
            {{ $t('orders.show.back.link') }}
          </v-btn>
        </router-link>
        <h4 class="text-h4 mt-10 mb-4 d-flex justify-space-between">
          <span>{{ $t('orders.show.products.title') }}</span>
          <v-btn color="success">
            <v-icon class="mr-2">mdi-plus-circle</v-icon>
            {{ $t('orders.show.products.add') }}
          </v-btn>
        </h4>
        <v-data-table :items="products" :headers="productHeaders" :items-per-page="5"
                      sort-by="ref" class="elevation-2">
          <template #[`item.weight`]="{ item }">
            <strong>{{ item.weight }}</strong><br>
            <small>
              <em>{{ $t('orders.show.packages.totalWeight', { total: item.totalWeight }) }}</em>
            </small>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="orderByRouteParam">
      <v-col :cols="12">
        <h4 class="text-h4 mt-10 mb-4 d-flex justify-space-between">
          <span>{{ $t('orders.show.packages.title') }}</span>
          <v-btn color="success">
            <v-icon class="mr-2">mdi-plus-circle</v-icon>
            {{ $t('orders.show.packages.add') }}
          </v-btn>
        </h4>
      </v-col>

      <v-col :cols="12" v-for="pack in packages" :key="pack.ref">
        <h5 class="text-h5 mt-5 mb-4">
          <span>
            {{ $t('orders.show.packages.name', { ref: pack.ref }) }}
          </span>
          <v-chip :color="pack.packageState.color">
            {{ pack.packageState.label }}
          </v-chip>
        </h5>
        <v-data-table :items="pack.products" :headers="packageProductHeaders" :items-per-page="5"
                      sort-by="ref" class="elevation-2">
          <template #[`item.preparationType`]="{ item }">
            <v-chip class="my-2" small :color="item.preparationType.color">
              {{ item.preparationType.label }}
            </v-chip>
          </template>
          <template #[`item.weight`]="{ item }">
            <strong>{{ item.weight }}</strong><br>
            <small>
              <em>{{ $t('orders.show.packages.totalWeight', { total: item.totalWeight }) }}</em>
            </small>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  productHeaders,
  orderStates,
  preparationTypes,
  packageProductHeaders
} from '@/configs/OrderDataTable'

export default {
  data () {
    return {
      productHeaders,
      packageProductHeaders
    }
  },
  computed: {
    ...mapGetters([
      'orderById'
    ]),
    orderByRouteParam () {
      return this.orderById(this.$route.params.orderId)
    },
    products () {
      return this.orderByRouteParam.products.map(({ item, quantity }) => {
        return this.transformProduct(item, quantity)
      })
    },
    packages () {
      return this.orderByRouteParam.packages.map(({ ref, packageState, products }) => {
        const productTransforms = products.map(({ preparationType, quantity, item }) => {
          return {
            ...this.transformProduct(item, quantity),
            preparationType: preparationTypes[preparationType]
          }
        })
        return {
          ref,
          packageState: orderStates[packageState],
          products: productTransforms
        }
      })
    }
  },
  methods: {
    transformProduct (item, quantity) {
      return {
        ref: item.ref,
        name: item.name,
        weight: item.weight,
        totalWeight: item.weight * quantity,
        quantity
      }
    }
  }
}
</script>

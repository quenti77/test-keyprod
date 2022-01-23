<template>
  <v-container>
    <v-row class="pb-5">
      <v-col>
        <h3 class="d-flex flex-column justify-center align-center text-center text-h3 mt-3 mb-5">
          <v-img src="../assets/logo/kp_white.png" :aspect-ratio="668 / 191"
                 position="bottom center" width="445" height="127" />
          <span>{{ $t('dashboard.title') }}</span>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card color="deep-purple darken-4">
          <v-card-title>
            {{ $t('dashboard.section.products.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <card-link to="/" icon="mdi-arrow-right-bold">
              {{ $t('dashboard.section.products.actions.see') }}
            </card-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="blue darken-4">
          <v-card-title>
            {{ $t('dashboard.section.orders.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <card-link to="/orders" icon="mdi-arrow-right-bold">
              {{ $t('dashboard.section.orders.actions.see') }}
            </card-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="teal darken-3">
          <v-card-title>
            {{ $t('dashboard.section.shipments.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <card-link to="/" icon="mdi-arrow-right-bold">
              {{ $t('dashboard.section.shipments.actions.see') }}
            </card-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardLink from '@/components/CardLink'

export default {
  components: {
    CardLink
  }
}
</script>

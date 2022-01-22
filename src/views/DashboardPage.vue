<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="deep-purple darken-4">
          <v-card-title>
            {{ $t('dashboard.section.products.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <v-btn text>
              <span class="mr-3">
                {{ $t('dashboard.section.products.actions.see') }}
              </span>
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="blue darken-4">
          <v-card-title>
            {{ $t('dashboard.section.orders.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <v-btn text>
              <span class="mr-3">
                {{ $t('dashboard.section.orders.actions.see') }}
              </span>
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="teal darken-3">
          <v-card-title>
            {{ $t('dashboard.section.shipments.title') }}
          </v-card-title>
          <v-card-actions class="justify-end">
            <v-btn text>
              <span class="mr-3">
                {{ $t('dashboard.section.shipments.actions.see') }}
              </span>
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>

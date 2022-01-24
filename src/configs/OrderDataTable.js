import i18n from '@/i18n.js'
import { ORDER_STATE, PREPARATION_TYPE } from '@/enums'

export const headers = [
  { text: i18n.t('orders.index.datatables.headers.ref'), value: 'ref' },
  { text: i18n.t('orders.index.datatables.headers.orderState'), value: 'orderState', align: 'start' },
  { text: i18n.t('orders.index.datatables.headers.client'), value: 'client', sortable: false },
  { text: i18n.t('orders.index.datatables.headers.products'), value: 'products', sortable: false },
  { text: i18n.t('orders.index.datatables.headers.actions'), value: 'actions', sortable: false, align: 'center' }
]

export const productHeaders = [
  { text: i18n.t('orders.show.datatables.headers.ref'), value: 'ref' },
  { text: i18n.t('orders.show.datatables.headers.name'), value: 'name' },
  { text: i18n.t('orders.show.datatables.headers.weight'), value: 'weight' },
  { text: i18n.t('orders.show.datatables.headers.quantity'), value: 'quantity' }
]

export const packageProductHeaders = [
  { text: i18n.t('orders.show.datatables.headers.ref'), value: 'ref' },
  { text: i18n.t('orders.show.datatables.headers.preparationType'), value: 'preparationType' },
  { text: i18n.t('orders.show.datatables.headers.name'), value: 'name' },
  { text: i18n.t('orders.show.datatables.headers.weight'), value: 'weight' },
  { text: i18n.t('orders.show.datatables.headers.quantity'), value: 'quantity' }
]

export const orderStates = {
  [ORDER_STATE.PREPARING]: { color: 'blue darken-4', label: i18n.t('orders.index.state.preparing') },
  [ORDER_STATE.SENDING]: { color: 'deep-orange darken-3', label: i18n.t('orders.index.state.sending') },
  [ORDER_STATE.DONE]: { color: 'green darken-3', label: i18n.t('orders.index.state.done') }
}

export const preparationTypes = {
  [PREPARATION_TYPE.WAITING]: { color: 'deep-orange darken-3', label: i18n.t('orders.index.preparation.waiting') },
  [PREPARATION_TYPE.DONE]: { color: 'green darken-3', label: i18n.t('orders.index.preparation.done') }
}

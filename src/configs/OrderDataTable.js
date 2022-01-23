import i18n from '@/i18n.js'
import { ORDER_STATE } from '@/enums'

export const headers = [
  { text: i18n.t('orders.index.datatables.headers.ref'), value: 'ref' },
  { text: i18n.t('orders.index.datatables.headers.orderState'), value: 'orderState' },
  { text: i18n.t('orders.index.datatables.headers.client'), value: 'client', sortable: false },
  { text: i18n.t('orders.index.datatables.headers.products'), value: 'products', sortable: false },
  { text: i18n.t('orders.index.datatables.headers.actions'), value: 'actions', sortable: false }
]

export const orderStates = {
  [ORDER_STATE.PREPARING]: { color: 'blue darken-4', label: i18n.t('orders.index.state.preparing') },
  [ORDER_STATE.SENDING]: { color: 'deep-orange darken-3', label: i18n.t('orders.index.state.sending') },
  [ORDER_STATE.DONE]: { color: 'green darken-3', label: i18n.t('orders.index.state.done') }
}

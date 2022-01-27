
import { v4 as uuidV4 } from 'uuid'

import * as constants from './constants'

import { ORDER_STATE, PREPARATION_TYPE } from '@/enums'

const mutations = {}

mutations[constants.ADD_PRODUCT] = (state, { name, ref, weight }) => {
  state.products.push({ id: uuidV4(), name, ref, weight })
}

mutations[constants.ADD_ORDER] = (state, { ref, client }) => {
  state.orders.push({
    id: uuidV4(),
    ref,
    client,
    orderState: ORDER_STATE.PREPARING,
    products: [],
    packages: []
  })
}

mutations[constants.ADD_PACKAGE] = (state, { order, ref }) => {
  state.orders[order].packages.push({
    id: uuidV4(), ref, packageState: ORDER_STATE.PREPARING, products: []
  })
}

mutations[constants.ATTACH_PRODUCT_TO_ORDER] = (state, { order, product, quantity }) => {
  state.orders[order].products.push({
    item: JSON.parse(JSON.stringify(product)),
    quantity
  })
}

mutations[constants.ATTACH_PRODUCT_TO_PACKAGE] = (state, { order, pack, product, quantity }) => {
  state.orders[order].packages[pack].products.push({
    item: JSON.parse(JSON.stringify(product)),
    quantity,
    preparationType: PREPARATION_TYPE.WAITING
  })
}

export default mutations

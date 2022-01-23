import { v4 as uuidV4 } from 'uuid'

import { PREPARATION_TYPE, ORDER_STATE } from '@/enums'

const initialState = {
  clients: [],
  orders: [],
  products: []
}

function createClient (name, email) {
  return { id: uuidV4(), name, email }
}

function initClients () {
  initialState.clients = [
    createClient('Jean', 'jean@keyprod.com'),
    createClient('Marc', 'marc@keyprod.com')
  ]
}

function createProduct (name, ref, weight) {
  return { id: uuidV4(), name, ref, weight }
}

function initProducts () {
  initialState.products = [
    createProduct('Simple sensor', 'KeyNetic_V1_AAAAAA', 200),
    createProduct('Complex sensor', 'KeyNetic_V1_BBBBBB', 400),
    createProduct('Another sensor', 'KeyNetic_V1_CCCCCC', 250),
    createProduct('Again sensor', 'KeyNetic_V1_DDDDDD', 325)
  ]
}

function createOrder (ref, client, orderState) {
  return {
    id: uuidV4(),
    ref,
    client,
    orderState,
    products: [],
    packages: []
  }
}

function attachProductToOrder (order, product, quantity) {
  order.products.push({
    item: JSON.parse(JSON.stringify(product)),
    quantity
  })
}

function initOrders ({ clients, products }) {
  const prepareOrder = createOrder('C-411145', clients[0], ORDER_STATE.PREPARING)
  attachProductToOrder(prepareOrder, products[0], 1)
  attachProductToOrder(prepareOrder, products[1], 1)

  const sendOrder = createOrder('C-587496', clients[1], ORDER_STATE.SENDING)
  attachProductToOrder(sendOrder, products[2], 2)
  attachProductToOrder(sendOrder, products[3], 2)

  const otherOrder = createOrder('C-751614', clients[0], ORDER_STATE.SENDING)
  attachProductToOrder(otherOrder, products[0], 2)
  attachProductToOrder(otherOrder, products[2], 1)
  attachProductToOrder(otherOrder, products[3], 1)

  const otherPrepareOrder = createOrder('C-102571', clients[1], ORDER_STATE.PREPARING)
  attachProductToOrder(otherPrepareOrder, products[0], 1)
  attachProductToOrder(otherPrepareOrder, products[1], 1)
  attachProductToOrder(otherPrepareOrder, products[2], 3)

  const alreadySentOrder = createOrder('C-475841', clients[0], ORDER_STATE.DONE)
  attachProductToOrder(alreadySentOrder, products[1], 1)
  attachProductToOrder(alreadySentOrder, products[3], 1)

  initialState.orders = [
    prepareOrder,
    sendOrder,
    otherOrder,
    otherPrepareOrder,
    alreadySentOrder
  ]
}

function createPackage (ref, packageState) {
  return { id: uuidV4(), ref, packageState, products: [] }
}

function attachProductToPackage (pack, product, quantity, preparationType) {
  pack.products.push({
    item: JSON.parse(JSON.stringify(product.item)),
    quantity,
    preparationType
  })
}

// Impossible to name parameters with "package" name
function attachPackageToOrder (order, pack) {
  order.packages.push(pack)
}

function initPackages ({ orders }) {
  let currentOrder = orders[0]

  const oneshotPackage = createPackage('P-727422', ORDER_STATE.PREPARING)
  attachProductToPackage(oneshotPackage, currentOrder.products[0], 1, PREPARATION_TYPE.WAITING)
  attachProductToPackage(oneshotPackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, oneshotPackage)

  currentOrder = orders[1]
  const firstPartSplitPackage = createPackage('P-124573', ORDER_STATE.SENDING)
  attachProductToPackage(firstPartSplitPackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(firstPartSplitPackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, firstPartSplitPackage)

  const secondPartSplitPackage = createPackage('P-375421', ORDER_STATE.SENDING)
  attachProductToPackage(secondPartSplitPackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(secondPartSplitPackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, secondPartSplitPackage)

  currentOrder = orders[2]
  const alreadySentPackage = createPackage('P-347837', ORDER_STATE.DONE)
  attachProductToPackage(alreadySentPackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(alreadySentPackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, alreadySentPackage)

  const needSendPackage = createPackage('P-4478523', ORDER_STATE.SENDING)
  attachProductToPackage(needSendPackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(needSendPackage, currentOrder.products[2], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, needSendPackage)

  currentOrder = orders[3]
  const bigPackage = createPackage('P-165313', ORDER_STATE.PREPARING)
  attachProductToPackage(bigPackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(bigPackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(bigPackage, currentOrder.products[2], 3, PREPARATION_TYPE.WAITING)
  attachPackageToOrder(currentOrder, bigPackage)

  currentOrder = orders[4]
  const alreadyDonePackage = createPackage('P-4478523', ORDER_STATE.DONE)
  attachProductToPackage(alreadyDonePackage, currentOrder.products[0], 1, PREPARATION_TYPE.DONE)
  attachProductToPackage(alreadyDonePackage, currentOrder.products[1], 1, PREPARATION_TYPE.DONE)
  attachPackageToOrder(currentOrder, alreadyDonePackage)
}

if (process.env.NODE_ENV === 'development') {
  initClients()
  initProducts()
  initOrders(initialState)
  initPackages(initialState)
}

export default initialState

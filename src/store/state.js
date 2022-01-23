import { v4 as uuidV4 } from 'uuid'

import { PREPARATION_TYPE, ORDER_STATE } from '@/enums'

const initialState = {
  clients: [],
  orders: [],
  packages: [],
  products: [],
  shipments: []
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
  return { id: uuidV4(), ref, client, orderState, products: [] }
}

function attachProductToOrder (order, product, quantity, preparationType) {
  order.products.push({
    product,
    quantity,
    preparationType
  })
}

function initOrders (clients, products) {
  const prepareOrder = createOrder('C-411145', clients[0], ORDER_STATE.PREPARING)
  attachProductToOrder(prepareOrder, products[0], 1, PREPARATION_TYPE.WAITING)
  attachProductToOrder(prepareOrder, products[1], 1, PREPARATION_TYPE.DONE)

  const sendOrder = createOrder('C-587496', clients[1], ORDER_STATE.SENDING)
  attachProductToOrder(sendOrder, products[2], 2, PREPARATION_TYPE.DONE)
  attachProductToOrder(sendOrder, products[3], 2, PREPARATION_TYPE.DONE)

  const otherOrder = createOrder('C-751614', clients[0], ORDER_STATE.SENDING)
  attachProductToOrder(otherOrder, products[0], 2, PREPARATION_TYPE.DONE)
  attachProductToOrder(otherOrder, products[2], 1, PREPARATION_TYPE.DONE)
  attachProductToOrder(otherOrder, products[3], 1, PREPARATION_TYPE.DONE)

  const otherPrepareOrder = createOrder('C-102571', clients[1], ORDER_STATE.PREPARING)
  attachProductToOrder(otherPrepareOrder, products[0], 1, PREPARATION_TYPE.WAITING)
  attachProductToOrder(otherPrepareOrder, products[1], 1, PREPARATION_TYPE.WAITING)
  attachProductToOrder(otherPrepareOrder, products[2], 3, PREPARATION_TYPE.WAITING)

  const alreadySentOrder = createOrder('C-475841', clients[0], ORDER_STATE.DONE)
  attachProductToOrder(alreadySentOrder, products[1], 1, PREPARATION_TYPE.DONE)
  attachProductToOrder(alreadySentOrder, products[3], 1, PREPARATION_TYPE.DONE)

  initialState.orders = [
    prepareOrder,
    sendOrder,
    otherOrder,
    otherPrepareOrder,
    alreadySentOrder
  ]
}

// TODO: Review data for package or shipment
function createPackage () {
  return { id: uuidV4(), products: [] }
}

function attachProductToPackage (pack, product) {
  pack.products.push({
    product
  })
}

function initPackages (products) {
  const soloPackage = createPackage()
  attachProductToPackage(soloPackage, products[0])
  attachProductToPackage(soloPackage, products[1])

  const firstPartPackage = createPackage()
  attachProductToPackage(firstPartPackage, products[2])
  const secondPartPackage = createPackage()
  attachProductToPackage(secondPartPackage, products[3])

  initialState.packages = [
    soloPackage,
    firstPartPackage,
    secondPartPackage
  ]
}

function createShipment (order = null) {
  return { id: uuidV4(), order, packages: [] }
}

function attachPackageToShipment (shipment, pack, packageState) {
  shipment.packages.push({
    package: pack,
    packageState
  })
}

function initShipments (packages, orders) {
  const firstShipment = createShipment()
  attachPackageToShipment(firstShipment, packages[0], ORDER_STATE.PREPARING)

  const secondShipment = createShipment(orders[1])
  attachPackageToShipment(secondShipment, packages[1], ORDER_STATE.DONE)
  attachPackageToShipment(secondShipment, packages[2], ORDER_STATE.SENDING)

  initialState.shipments = [
    firstShipment,
    secondShipment
  ]
}

if (process.env.NODE_ENV === 'development') {
  initClients()
  initProducts()
  initOrders(initialState.clients, initialState.products)
  initPackages(initialState.products)
  initShipments(initialState.packages, initialState.orders)
}

export default initialState


export const orders = (state) => state.orders
export const orderById = (state) => {
  return (id) => state.orders.find(order => order.id === id)
}

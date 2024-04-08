import React from 'react'
import OrdersCustomerComponent from '../../components/OrdersCustomerComponent'
import LayoutComponent from '../../layout/LayoutMain'

const OrdersCustomerPage = () => {
  return (
    <div>
      <LayoutComponent>
         <OrdersCustomerComponent />
      </LayoutComponent>
    </div>
  )
}

export default OrdersCustomerPage
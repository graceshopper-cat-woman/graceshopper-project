import React from 'react'
import {Link} from 'react-router-dom'

export const OrderConfirmation = () => {
  return (
    <div>
      <h1>Thank you for shopping with us!</h1>
      <Link className="cartViewTotal" id="continue" to="/mugs">
        Continue shopping?{' '}
      </Link>
    </div>
  )
}

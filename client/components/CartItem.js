import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const CartItem = ({item, setPrice}) => {
  return (
    <div className="cartItemContainer">
      <div>
        <img id="cartItemImg" src={item.imageUrl} alt={item.name} />
      </div>
      <div className="cartItemDescription">
        <Link to={`/mugs/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
        <div className="cartItemPrice">
          <FontAwesomeIcon id="minus" icon={['fas', 'minus']} />
          <p>Qty: {item.mugOrder.quantity}</p>
          <FontAwesomeIcon id="plus" icon={['fas', 'plus']} />
        </div>
        <span>
          <p>
            Price: ${setPrice(item.price)} x {item.mugOrder.quantity} = $
            {(setPrice(item.price) * item.mugOrder.quantity).toFixed(2)}
          </p>
        </span>
      </div>
      <FontAwesomeIcon id="trash" icon={['fas', 'trash-alt']} />
    </div>
  )
}

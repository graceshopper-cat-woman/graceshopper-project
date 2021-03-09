import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const CartItem = ({
  item,
  setPrice,
  updateCart,
  orderId,
  loadCart,
  removeItem
}) => {
  const [quantity, setQuantity] = useState(item.mugOrder.quantity)
  //const [deleted, setDeleted] = useState(false)

  async function handleIncrement() {
    let updated = ++item.mugOrder.quantity
    setQuantity(updated)
    await updateCart(orderId, updated, item.id)
  }

  async function handleDecrement() {
    let updated = --item.mugOrder.quantity
    setQuantity(updated)
    await updateCart(orderId, updated, item.id)
    if (updated === 0) {
      await loadCart()
    }
  }
  async function handleDelete() {
    await removeItem(orderId, item.id)
  }

  return (
    <div className="cartItemContainer">
      <div>
        <img id="cartItemImg" src={item.imageUrl} alt={item.name} />
      </div>
      <div className="cartItemDescription">
        <Link to={`/mugs/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
        <div className="cartItemPrice" id={item.id}>
          <span id="iconContainer" onClick={handleDecrement}>
            <FontAwesomeIcon id="minus" mug={item.id} icon={['fas', 'minus']} />
          </span>
          <p>{item.mugOrder.quantity}</p>
          <span id="iconContainer" onClick={handleIncrement}>
            <FontAwesomeIcon id="plus" icon={['fas', 'plus']} />
          </span>
        </div>
        <span>
          <p>
            Price: ${setPrice(item.price)} x {item.mugOrder.quantity} = $
            {(setPrice(item.price) * item.mugOrder.quantity).toFixed(2)}
          </p>
        </span>
      </div>
      <span id="iconContainer" onClick={handleDelete}>
        <FontAwesomeIcon
          id="trash"
          name={item.id}
          icon={['fas', 'trash-alt']}
        />
      </span>
    </div>
  )
}

import React from 'react'

export const MugForm = props => (
  <form id="mug-form" onSubmit={props.handleSubmit}>
    <label htmlFor="mugName">Mug Name:</label>
    <input
      name="name"
      type="text"
      onChange={props.handleChange}
      value={props.name}
    />
    <br />

    <label htmlFor="description">Mug Description:</label>
    <input
      name="description"
      type="text"
      onChange={props.handleChange}
      value={props.description}
    />
    <br />

    <label htmlFor="imageUrl">Mug Image Url:</label>
    <input
      name="imageUrl"
      type="text"
      onChange={props.handleChange}
      value={props.imageUrl}
    />
    <br />

    <label htmlFor="price">Mug Price(In dollars and cents):</label>
    <input
      name="price"
      type="text"
      onChange={props.handleChange}
      value={props.price}
    />
    <br />

    <label htmlFor="color">Mug Color:</label>
    <input
      name="color"
      type="text"
      onChange={props.handleChange}
      value={props.color}
    />
    <br />

    <label htmlFor="size">Mug Size (oz):</label>
    <input
      name="size"
      type="text"
      onChange={props.handleChange}
      value={props.size}
    />
    <br />

    <label htmlFor="inventory">Mug Inventory (# of):</label>
    <input
      name="inventory"
      type="text"
      onChange={props.handleChange}
      value={props.inventory}
    />
    <br />

    <button type="submit">Submit</button>
  </form>
)

export default MugForm

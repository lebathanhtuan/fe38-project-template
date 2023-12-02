function Item({ name, price }) {
  const clickMe = (productName) => {
    alert(productName)
  }

  return (
    <div>
      <h4>{name}</h4>
      <h5>{price.toLocaleString()} VND</h5>
      <button onClick={() => clickMe(name)}>Buy</button>
      <hr />
    </div>
  )
}

export default Item

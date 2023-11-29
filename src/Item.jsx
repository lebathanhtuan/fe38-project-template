function Item({ name, price }) {
  const clickMe = (message) => {
    console.log(message);
  };

  return (
    <div>
      <h4>{name}</h4>
      <h5>{price.toLocaleString()} VND</h5>
      <button onClick={() => clickMe("ahihi")}>Buy</button>
      <hr />
    </div>
  );
}

export default Item;

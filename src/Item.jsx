function Item() {
  const clickMe = (message) => {
    console.log(message);
  };
  return (
    <div>
      <h4>Item</h4>
      <button onClick={() => clickMe("ahihi")}>Click me</button>
    </div>
  );
}

export default Item;

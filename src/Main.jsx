import Filter from "./Filter";
import Item from "./Item";

function Main(props) {
  console.log("🚀 ~ file: Main.jsx:5 ~ Main ~ props:", props);
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 22000000,
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 28000000,
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      price: 24000000,
    },
  ];
  const renderProductItems = products.map((item) => {
    return <Item key={item.id} name={item.name} price={item.price} />;
  });
  return (
    <>
      <h2>Main</h2>
      <Filter />
      {renderProductItems}
    </>
  );
}

export default Main;

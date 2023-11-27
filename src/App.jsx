import logo from "./logo.svg";
import "./App.css";

function App() {
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
  const obj = {
    id: 1,
    name: "iphone 15",
    price: 30000000,
    content: "Ahihi",
    image: "",
    rate: 5,
  };
  const obj2 = {
    chip: "Apple A17",
    ram: "6Gb",
  };
  const newObj = {
    name: "Ahehe",
    ...obj,
    ...obj2,
    store: 256,
  };

  const arr = ["A", "B", "C"];
  const arr2 = [1, 2, 3, 4, 5];

  const { name, price, content, ...rest } = obj;
  // const name = obj.name;
  // const price = obj.price;
  // const content = obj.content;

  const [dataA, dataB] = arr;
  // const dataA = arr[0]
  // const dataB = arr[1]

  console.log("🚀 ~ file: App.js:30 ~ App ~ newObj:", newObj);

  const newArr = [0, ...arr, ...arr2, "D"];
  console.log("🚀 ~ file: App.js:39 ~ App ~ newArr:", newArr);

  // function lamNayLamNo(param1, param2) {
  //   return param1 + param2;
  // }

  const lamNayLamNo = (param1, param2) => param1 + param2;

  for (let i = 0; i < arr.length; i++) {
    console.log("for thường item:", i, newArr[i]);
  }

  arr.forEach((item, index) => console.log("forEach item:", index, item));

  // const mapArr = ['A1', 'B2', 'C3']
  const mapArr = arr.map((item, index) => `${item}${index + 1}`);

  const filterArr = arr.filter((_, index) => index >= 1);

  const newProducts = products.map((item) => {
    return {
      ...item,
      price: `${item.price.toLocaleString()} VNĐ`,
    };
  });

  const filterProducts = products.filter((item) => item.price >= 24000000);

  const findIndex15Pro = products.findIndex((item) => {
    return item.name === "iPhone 15 Pro";
  });
  console.log(
    "🚀 ~ file: App.js:92 ~ findIndex15Pro ~ findIndex15Pro:",
    findIndex15Pro
  );

  const find15Pro = products.find((item) => {
    return item.name === "iPhone 15 Pro";
  });
  console.log("🚀 ~ file: App.js:92 ~ find15Pro ~ find15Pro:", find15Pro);

  const some15Pro = products.some((item) => {
    return item.name === "iPhone 15 Pro";
  });
  console.log("🚀 ~ file: App.js:92 ~ some15Pro ~ some15Pro:", some15Pro);

  const score = [4, 7, 5, 8, 9, 6];
  // let total = 0;
  // for (let i = 0; i < score.length; i++) {
  //   total = total + score[i];
  // }
  const diemTrungBinh =
    score.reduce((total, item) => total + item, 0) / score.length;
  console.log("🚀 ~ file: App.js:113 ~ App ~ diemTrungBinh:", diemTrungBinh);

  const totalPrice = products.reduce((total, item) => total + item.price, 0);
  console.log("🚀 ~ file: App.js:117 ~ App ~ totalPrice:", totalPrice);

  score.sort((a, b) => b - a);
  console.log("🚀 ~ file: App.js:120 ~ App ~ score:", score);

  products.splice(2, 1, {
    ...products[2],
    name: "iPhone 15 Pro Max",
  });
  console.log("🚀 ~ file: App.js:123 ~ App ~ products:", products);

  arr.splice(2, 0, "D");
  console.log("🚀 ~ file: App.js:124 ~ App ~ arr:", arr);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => console.log("ahihi")}>Click here</button>
      </header>
    </div>
  );
}

export default App;

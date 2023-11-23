import logo from "./logo.svg";
import "./App.css";

function App() {
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
  console.log("🚀 ~ file: App.js:57 ~ mapArr ~ mapArr:", mapArr);

  const filterArr = arr.filter((item, index) => index >= 1);
  console.log("🚀 ~ file: App.js:62 ~ filterArr ~ filterArr:", filterArr);

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

import { sum, trungbinh } from "./calculator";

function Header(props) {
  console.log("🚀 ~ file: Header.jsx:4 ~ Header ~ props:", props);

  const sunResult = sum(3, 7);
  console.log("🚀 ~ file: Header.jsx:5 ~ Header ~ sunResult:", sunResult);
  const trungBinhResult = trungbinh([6, 5, 8]);
  console.log(
    "🚀 ~ file: Header.jsx:7 ~ Header ~ trungBinhResult:",
    trungBinhResult
  );
  return (
    <div>
      <div>Header</div>
      {props.children}
    </div>
  );
}

export default Header;

import { sum, trungbinh } from "./calculator";

function Header() {
  const sunResult = sum(3, 7);
  console.log("🚀 ~ file: Header.jsx:5 ~ Header ~ sunResult:", sunResult);
  const trungBinhResult = trungbinh([6, 5, 8]);
  console.log(
    "🚀 ~ file: Header.jsx:7 ~ Header ~ trungBinhResult:",
    trungBinhResult
  );
  return <div>Header</div>;
}

export default Header;

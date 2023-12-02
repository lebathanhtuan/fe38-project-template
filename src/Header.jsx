import { sum, trungbinh } from './calculator'

function Header(props) {
  const sunResult = sum(3, 7)
  const trungBinhResult = trungbinh([6, 5, 8])

  return (
    <div>
      <div>Header</div>
      {props.children}
    </div>
  )
}

export default Header

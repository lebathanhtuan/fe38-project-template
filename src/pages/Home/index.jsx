import { Link } from 'react-router-dom'

import Main from '../../Main'

function HomePage() {
  return (
    <div className="wrapper">
      <Link to="/about">Go to About</Link>
      <Main />
    </div>
  )
}

export default HomePage

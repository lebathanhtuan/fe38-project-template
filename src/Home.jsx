import Header from './Header'
import Main from './Main'
import Footer from './Footer'

// PascalCase
function Home() {
  function clickAhihi() {
    console.log('ahihi')
  }
  return (
    <div className="wrapper">
      <Header>
        <div>
          <h2>Tuấn</h2>
        </div>
      </Header>
      <Main />
      {/* {Footer({
        name: "Tuấn",
        address: "iViettech",
      })} */}
      <Footer />
    </div>
  )
}

export default Home

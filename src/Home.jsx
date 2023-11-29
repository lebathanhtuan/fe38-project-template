import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./App.css";

// PascalCase
function Home() {
  function clickAhihi() {
    console.log("ahihi");
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
      <Footer
        name="Tuấn"
        address="iViettech"
        classId={38}
        isClose={true}
        clickAhihi={clickAhihi}
      />
    </div>
  );
}

export default Home;

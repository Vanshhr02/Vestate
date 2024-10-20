import { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";



function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
     {/* Video Background*/}
      <video className="backgroundVideo" autoPlay loop muted>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Main Content Section */}
      <div className="content">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo
              suscipit cum eius, iure est nulla animi consequatur facilis id pariatur
              fugit quos laudantium temporibus dolor ea repellat provident impedit!
            </p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        {/* <div className="imgContainer">
          <img src="/bg.png" alt="Real Estate" />
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;

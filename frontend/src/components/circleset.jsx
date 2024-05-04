import "../css/circleset.css";
import Girl1 from "../assets/images/Girl_1.png";

const CircleSet = () => {
  return (
    <div className="wrapper">
      <div className="circle-container">
        <div className="largest"></div>
        <div className="medium"></div>
        <div className="smallest"></div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={Girl1} alt="Your Image" />
      </div>
    </div>
  );
};

export default CircleSet;

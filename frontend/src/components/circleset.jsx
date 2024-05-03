// const CircleSet = ({ circles }) => {
//   return (
//     <div className="circle-set">
//       {circles.map((circle, index) => (
//         <Circle key={index} {...circle} />
//       ))}
//     </div>
//   );

import "../css/circleset.css";
// };
const CircleSet = () => {
  return (
    <>
      <div class="circle-container">
        <div class="largest"></div>
        <div class="medium"></div>
        <div class="smallest"></div>
      </div>
    </>
  );
};

export default CircleSet;

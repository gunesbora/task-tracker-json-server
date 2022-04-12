// import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, showAddTask, toggleShow }) => {
 
  return (
    <div className="header">
      <h1>{title}</h1>
      
      <Button
        color={showAddTask ? "red" : "purple"}
        text={showAddTask ? "Close Add Task Bar" : "Show Add Task Bar"}
        toggleShow={toggleShow}
      />
    </div>
  );
};


export default Header;

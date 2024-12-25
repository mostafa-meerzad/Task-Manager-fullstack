import { Link } from "react-router-dom";
import LogOut from "../auth/LogOut.jsx";

const Navbar = () => {
  return (
    <nav className="flex m-3 p-4 gap-5 justify-start items-center bg-gray-100 rounded-md">
      <h1 className={"pr-5 cursor-default"}>Task Manager</h1>
      <ul className={"flex gap-4 p-4"}>
        <Link to={"/"}>Home</Link>
        <Link to={"/tasks"}>Tasks</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <LogOut />
      </ul>
    </nav>
  );
};
export default Navbar;

import {Link} from "react-router-dom";
import LogOut from "../auth/LogOut.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsProgress} from "@fortawesome/free-solid-svg-icons";

const links = [
    {url: "/", label: "Home"},
    {url: "/tasks", label: "Tasks"},
    {url: "/login", label: "Login"},
    {url: "/register", label: "Register"},

]
const Navbar = () => {
    return (
        <nav className="flex flex-col w-52 h-screen p-6 bg-[#2C2C38] text-white">

            <h1 className={" text-xl font-semibold mb-12"}><FontAwesomeIcon icon={faBarsProgress}/> Task Manager</h1>
            <ul className={"flex flex-col gap-6 font-semibold"}>
                {
                    links.map((link) => (
                        <Link to={link.url} key={link.url}>{link.label}</Link>
                    ))
                }
                <LogOut/>
            </ul>
        </nav>
    );
};
export default Navbar;

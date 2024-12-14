import { Flex} from "@radix-ui/themes";
import {Link} from "react-router-dom";
import {Link as UILink} from "@radix-ui/themes"
const Navbar = () => {
    return (
<nav className="">

    <Flex gap={"5"} p={"3"}  className={"m-5 border border-gray-200 rounded-md"}>
        <h1 className={"font-medium"}>Task Manager</h1>
        <Flex gap={"3"} >
            <Link to={"/"}><UILink>Home</UILink></Link>
            <Link to={"/tasks"}><UILink>Tasks</UILink></Link>
            <Link to={"/login"}><UILink>Login</UILink></Link>
            <Link to={"/register"}><UILink>Register</UILink></Link>
        </Flex>
    </Flex>
</nav>
    )
}
export default Navbar

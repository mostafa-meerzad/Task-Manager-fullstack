import { Link as UILink } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import * as Toolbar from "@radix-ui/react-toolbar";

const Navbar = () => {
  return (
    <Toolbar.Root className="flex m-3 p-4 gap-4 bg-gray-100 rounded-md">
      <h1 className={"pr-5 cursor-default"}>Task Manager</h1>
      <Toolbar.Link asChild>
        <Link to={"/"}>
          <UILink>Home</UILink>
        </Link>
      </Toolbar.Link>
      <Toolbar.Link>
        <Link to={"/tasks"}>
          <UILink>Tasks</UILink>
        </Link>
      </Toolbar.Link>
      <Toolbar.Link>
        <Link to={"/login"}>
          <UILink>Login</UILink>
        </Link>
      </Toolbar.Link>
      <Toolbar.Link>
        <Link to={"/register"}>
          <UILink>Register</UILink>
        </Link>
      </Toolbar.Link>
    </Toolbar.Root>
  );
};
export default Navbar;

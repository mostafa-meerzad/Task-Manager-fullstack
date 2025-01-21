import Navbar from "./navbar/Navbar.jsx";

const Layout = ({children}) => {
    return (
        <div className={"flex"}>
            <Navbar/>
            <main className={" flex-1 p-4 bg-[#1E1E1E]"}>
                {children}
            </main>
        </div>
    );
};
export default Layout;

import Navbar from "./navbar/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className={"flex m-3 p-4 gap-4 bg-gray-100 rounded-md"}>
        {children}
      </main>
    </div>
  );
};
export default Layout;

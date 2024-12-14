import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className={"flex m-3 p-4 gap-4 bg-gray-100 rounded-md"}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/tasks" exact element={<TaskPage />} />
        </Routes>
      </main>
    </Router>
  );
};
export default App;

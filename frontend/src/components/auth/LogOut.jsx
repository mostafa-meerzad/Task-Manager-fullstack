const LogOut = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <button className={"text-red-500"} onClick={handleLogOut}>
      LogOut
    </button>
  );
};
export default LogOut;

const LogOut = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <button className={"text-red-500"} onClick={handleLogOut}>
      Log Out
    </button>
  );
};
export default LogOut;

import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Invalid credentials");
        alert("request failed");
      }
      // console.log(response.json())
      const {user} = await response.json()
      const token = user.token;
      localStorage.setItem("token", token);
      console.log("Logged in successfully!, token saved: ", token);

      // const token = response.json()
    } catch (err) {
      console.log("register failed: ", err);
      alert(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-start items-center">
        <label htmlFor="name">name: </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span> {errors.name.message}</span>}
      </div>
      <div className="flex justify-start items-center">
        <label htmlFor="email">email: </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Name is required" })}
        />
        {errors.email && <span> {errors.email.message}</span>}
      </div>
      <div className="flex justify-start items-center">
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Name is required" })}
        />
        {errors.password && <span> {errors.password.message}</span>}
      </div>

      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Register;

import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

          if (!response.ok) {
              throw new Error("Invalid credentials");
          }

          const token = await response.json();
          localStorage.setItem("token", token);
          console.log("Logged in successfully!, token saved: ", token);
      }
      catch (error) {
          console.error("Login failed, ", error.message);
          alert(error.message);
      }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-start items-center">
        <label htmlFor={"email"}>email: </label>
        <input type="text" id="email" {...register("email", {required:"Email is required"})} />
        {errors.email && <span> {errors.email.message}</span>}
      </div>
      <div className="flex justify-start items-center">
        <label htmlFor={"password"}>password: </label>
        <input type="password" id="password" {...register("password", {required:"Password is required"})} />
        {errors.password && <span> {errors.password.message}</span>}
      </div>
        <br/>
      <button type="submit">Submit</button>
    </form>
  );
};
export default Login;

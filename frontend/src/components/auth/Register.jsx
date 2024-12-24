import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

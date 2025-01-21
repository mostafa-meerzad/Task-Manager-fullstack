import {useForm} from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
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
        } catch (error) {
            console.error("Login failed, ", error.message);
            alert(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col gap-4 justify-center items-start p-4 bg-[#2C2C38] text-white w-80  rounded-md"}>
            <h3 className={"text-xl font-bold"}>Login</h3>
            <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor={"email"} className={"font-semibold"}>Email: </label>
                <input type="text" id="email" {...register("email", {required: "Email is required"})}
                       className={`w-full bg-inherit  border rounded p-1 ${errors.email ? "border-red-400" : "border-gray-500"}`}
                       placeholder={"Your email address"}/>
                {errors.email && <span className={"text-red-400 text-sm"}> {errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor={"password"} className={"font-semibold"}>password: </label>
                <input type="password" id="password" {...register("password", {required: "Password is required"})}
                       className={`w-full bg-inherit  border rounded p-1 ${errors.password ? "border-red-400" : "border-gray-500"}`}
                       placeholder={"Your password"}/>
                {errors.password && <span className={"text-red-400 text-sm"}> {errors.password.message}</span>}
            </div>
            <br/>
            <button type="submit" className={"bg-[#645FC6] w-full p-1.5 rounded-full font-bold m-auto -mt-4"}>Submit
            </button>
        </form>
    );
};
export default Login;

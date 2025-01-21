import {useForm} from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
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
        <form onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col gap-4 justify-center items-start p-4 bg-[#2C2C38] text-white w-80  rounded-md"}>
            <h3 className={"text-xl font-bold"}>Register</h3>
            <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="name" className={"font-semibold"}>name: </label>
                <input
                    type="text"
                    id="name"
                    {...register("name", {required: "Name is required"})}
                    className={`w-full bg-inherit  border rounded p-1 ${errors.name ? "border-red-400": "border-gray-500" }`}
                    placeholder={"Your name"}
                />
                {errors.name && <span className={"text-red-400 text-sm"}> {errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="email" className={"font-semibold"}>email: </label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {required: "Name is required"})}
                    className={`w-full bg-inherit  border rounded p-1 ${errors.email ? "border-red-400": "border-gray-500" }`}
                    placeholder={"Your email address"}
                />
                {errors.email && <span className={"text-red-400 text-sm"}> {errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="password" className={"font-semibold"}>password: </label>
                <input
                    type="password"
                    id="password"
                    {...register("password", {required: "Name is required"})}
                    className={`w-full bg-inherit  border rounded p-1 ${errors.password ? "border-red-400": "border-gray-500" }`}
                    placeholder={"Your password"}
                />
                {errors.password && <span className={"text-red-400 text-sm"}> {errors.password.message}</span>}
            </div>

            <br/>
            <button type="submit" className={"bg-[#645FC6] w-full p-1.5 rounded-full font-bold m-auto -mt-4"}>Submit
            </button>
        </form>
    );
};
export default Register;

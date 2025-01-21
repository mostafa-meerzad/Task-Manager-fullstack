import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const TaskModal = ({task, closeModal, setTasks}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            title: task ? task.title : "",
            description: task ? task.description : "",
        },
    });

    const onSubmit = async (data) => {
        const method = task ? "PUT" : "POST";
        const url = task ? `/api/tasks/${task._id}` : "/api/tasks";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                setTasks((prevTasks) =>
                    task
                        ? prevTasks.map((t) => (t._id === task._id ? responseData : t))
                        : [...prevTasks, responseData],
                );
                closeModal();
            } else {
                console.log("Failed to save the task", task);
                alert("failed to save the task");
            }
        } catch (err) {
            console.log("error saving task: ", err);
        }
    };
    return (
        <div className={"modal absolute right-0 left-0 m-auto w-min "}>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={"flex flex-col gap-4 justify-center items-start p-4 bg-[#2C2C38] text-white w-80  rounded-md"}>
                <h3 className={"text-xl font-bold"}> {task ? "Edit Task" : "Create Task"}</h3>

                <div className="flex flex-col gap-2 w-full items-start">
                    <label htmlFor="title" className={"font-semibold"}></label>
                    <input
                        type="text"
                        id="title"
                        placeholder={"title"}
                        {...register("title", {required: "title is required"})}
                        className={`w-full bg-inherit  border rounded p-1 ${errors.title ? "border-red-400" : "border-gray-500"}`}
                    />
                    {errors.title && <span className={"text-red-400 text-sm"}> {errors.title.message}</span>}
                </div>

                <div className="flex flex-col gap-2 w-full items-start">
                    <label htmlFor={"description"} className={"font-semibold"}></label>
                    <input
                        type="text"
                        id="description"
                        placeholder={"description"}
                        {...register("description", {
                            required: "description is required",
                        })}
                        className={`w-full bg-inherit  border rounded p-1 ${errors.description ? "border-red-400" : "border-gray-500"}`}
                    />
                    {errors.description && <span className={"text-red-400 text-sm"}>{errors.description.message}</span>}
                </div>

                <div className={"flex w-full gap-2 mt-6"}>
                    <button type="submit"
                            className={"bg-[#645FC6] flex-1 w-full p-1.5 rounded-full font-bold "}>{task ? "Save Changes" : "Add Task"}</button>
                    <button type={"button"} className={"bg-white w-9 h-9 text-[#2C2C38] p-1.5 rounded-full font-bold "}
                            onClick={closeModal}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default TaskModal;

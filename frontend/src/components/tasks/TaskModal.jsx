import { useForm } from "react-hook-form";

const TaskModal = ({ task, closeModal, setTasks }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className={"modal"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2> {task ? "Edit Task" : "Create Task"}</h2>

        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            placeholder={"title"}
            {...register("title", { required: "title is required" })}
          />
          {errors.title && <span> {errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor={"description"}></label>
          <input
            type="text"
            id="description"
            placeholder={"description"}
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <button type="submit">{task ? "Save Changes" : "Add Task"}</button>
          <button type={"button"} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskModal;

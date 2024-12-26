import { useEffect, useState } from "react";
import TaskModal from "./TaskModal.jsx";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("something went wrong with fetching tasks", error);
      }
    };

    getTasks();
  }, []);

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId),
        );
      } else {
        alert("Failed to delete the task!");
        console.error("Failed to delete task", taskId);
      }
    } catch (error) {
      console.log("Something went wrong with fetching tasks", error);
    }
  };

  return (
    <div>
      <ul className={"flex flex-col gap-8 "}>
        {tasks.map((task) => (
          <li
            key={task._id}
            className={"flex justify-start items-center gap-3"}
          >
            <h3 className={"text-lg font-medium"}>{task.title}</h3>
            <p>{task.description}</p>
            <div
              className={`inline-block w-3 h-3 rounded-full border shadow ${task.completed ? "bg-green-400" : "bg-red-400"}`}
            />

            <button
              className={"font-medium text-green-400"}
              onClick={() => openModal(task)}
            >
              Edit
            </button>
            <button
              className={"font-medium text-red-500"}
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          closeModal={closeModal}
          setTasks={setTasks}
        />
      )}
    </div>
  );
};
export default TaskList;

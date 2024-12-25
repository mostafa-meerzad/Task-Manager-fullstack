import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <ul className={"flex flex-col gap-8 "}>
      {tasks.map((task) => (
        <li key={task._id} className={"flex justify-start items-center gap-3"}>
          <h3 className={"text-lg font-medium"}>{task.title}</h3>
          <p>{task.description}</p>
          <div
            className={`inline-block w-3 h-3 rounded-full border shadow ${task.completed ? "bg-green-400" : "bg-red-400"}`}
          ></div>
        </li>
      ))}
    </ul>
  );
};
export default TaskList;

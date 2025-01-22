import {useEffect, useState} from "react";
import TaskModal from "./TaskModal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPenToSquare, faSquarePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import log from "eslint-plugin-react/lib/util/log.js";

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
                    headers: {Authorization: `Bearer ${token}`},
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
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
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
        <div className={"flex flex-col text-white relative "}>
            <header className="flex justify-between items-center p-2 pl-0">
                <h1 className={"text-xl font-bold"}>Your Tasks</h1>

                <button className="text-md font-semibold flex justify-center items-center gap-2"
                        onClick={() => openModal()}>
                    <FontAwesomeIcon icon={faSquarePlus} className={"text-2xl"}/>
                    New Task
                </button>
            </header>
            <ul className={"flex flex-col gap-8 mt-8 max-h-[85dvh] overflow-y-scroll"}>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={"relative flex justify-between items-center gap-2 p-4 rounded-xl bg-[#2C2C38]"}
                    >

                        <div
                            className={`absolute top-1 left-1 inline-block w-2 h-2 rounded-full shadow ${task.completed ? "bg-green-400" : "bg-red-400"}`}
                        />
                        <div className={"flex flex-col gap-3"}>
                            <h3 className={"text-lg font-medium"}>
                                {task.title}
                            </h3>
                            <p className={"text-gray-300"}>{task.description}</p>
                        </div>

                        <div className={"flex flex-col justify-center items-start gap-3"}>
                            <button
                                className={"flex justify-center items-center gap-2 font-medium text-green-400"}
                                onClick={() => openModal(task)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare}/>
                                Edit
                            </button>
                            <button
                                className={"flex items-center justify-center gap-2 font-medium text-red-500 "}
                                onClick={() => deleteTask(task._id)}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                                Delete
                            </button>
                            <button
                                className={`flex items-center justify-center gap-2 font-medium ${task.completed ? "text-green-400" : "text-gray-400"}`}
                                onClick={() => console.log(task._id)}
                            >
                                <FontAwesomeIcon icon={faCircleCheck}/>
                                Completed
                            </button>
                        </div>

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
            <div className={`${isModalOpen && "w-full h-full bg-[#1E1E1E] opacity-90 absolute"}`}></div>
        </div>
    );
};
export default TaskList;

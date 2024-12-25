import TaskList from "../components/tasks/TaskList.jsx";

const TaskPage = () => {
  return (
    <div className={"flex gap-6 flex-col"}>
      <h2>TaskPage</h2>
      <TaskList />
    </div>
  );
};
export default TaskPage;

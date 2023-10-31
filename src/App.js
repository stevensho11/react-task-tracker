import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react";
import AddTask from "./Components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Wake Up",
      day: "October 31 at 9:00AM",
      reminder: true,
    },
    {
      id: 2,
      text: "Ice Bucket Challenge",
      day: "October 31 at 9:05AM",
      reminder: true,
    },
    {
      id: 3,
      text: "Back to Sleep",
      day: "October 31 at 9:10AM",
      reminder: false,
    },
  ]);

  //Add a task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);

    console.log(id);
  };

  //Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle a reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //Toggle AddTask Form
  const onAdd = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <div className="container">
      <Header title="Task Tracker" onAdd={onAdd} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks!"
      )}
    </div>
  );
}

export default App;

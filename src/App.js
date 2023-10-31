import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react";

function App() {
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

  //Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;

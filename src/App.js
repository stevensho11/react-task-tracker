import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react";
import AddTask from "./Components/AddTask";
import { useEffect } from "react";
import Footer from "./Components/Footer";
import About from "./Components/About";
import TaskDetails from "./Components/TaskDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //Fetch single task from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Add a task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle a reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  //Toggle AddTask Form
  const onAdd = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAdd={onAdd} showAdd={showAddTask} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks!"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

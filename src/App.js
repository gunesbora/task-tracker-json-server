import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const baseUrl = "http://localhost:3002/tasks";

  
  const fetchTasks = async () => {
    const { data } = await axios.get(baseUrl);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const addTask = async (newTask) => {
    const res = await axios.post(baseUrl, newTask);
    console.log(res);
    fetchTasks();
  };

  
  const deleteTask = async (deletedTaskId) => {
    await axios.delete(`${baseUrl}/${deletedTaskId}`);
    fetchTasks();
  };

  
  const toggleDone = async (toggleDoneId) => {
    const { data } = await axios.get(`${baseUrl}/${toggleDoneId}`);
    console.log(data);
   
    await axios.patch(`${baseUrl}/${toggleDoneId}`, { isDone: !data.isDone });
    fetchTasks();
  };

  
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="TASK TRACKER"
        showAddTask={showAddTask}
        toggleShow={toggleShow}
      />

      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <h2 style={{ textAlign: "center" }}>NO TASK TO SHOW</h2>
      )}
    </div>
  );
}

export default App;

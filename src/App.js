import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTaks from "./components/AddTaks";
import About from "./components/About";
import { db } from "./config/Firebase";
import { collection, getDocs, query } from "firebase/firestore";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const tasksRef = collection(db, "tasks");

  const tasksDoc = query(tasksRef);
  //fetch tasks
  const fetchTasks = async () => {
    // const res = await fetch('http://localhost:3000/tasks.json')res.json()
    const data = await getDocs(tasksDoc)
    const treatedData = data.docs.map(doc => doc.data())

    return treatedData
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //add task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:3000/tasks',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleRiminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const upDateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(upDateTask)
      })

    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTaks onAdd={addTask} />}

              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleRiminder} />)
              : ('No tasks to show')

            </>
          }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTaks from "./components/AddTaks";
import About from "./components/About";
import { db } from "./config/Firebase";
import { collection, deleteDoc, getDocs, query, where, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";

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
  const getAllTasksDoc = query(tasksRef);

  //fetch tasks
  const fetchTasks = async () => {
    const data = await getDocs(getAllTasksDoc)
    const treatedData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return treatedData
  }

  // const fetchTask = async (entry) => {


  //   return treatedData
  // }

  //add task
  const addTask = async (task) => {
    const docRef = await addDoc(tasksRef, task)

    setTasks([...tasks, { ...task, id: docRef.id }])
  }

  //delete task
  const deleteTask = async (id) => {
    const taskToDelete = doc(db, "tasks", id)
    await deleteDoc(taskToDelete);

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleRiminder = async (entry) => {
    const docRef = doc(db, "tasks", entry);
    const data = await getDoc(docRef);
    const taskToToggle = { ...data.data(), id: entry }
    const upDateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    updateDoc(docRef, upDateTask)

    setTasks(tasks.map((task) =>
      task.id === entry ? { ...task, reminder: upDateTask.reminder } : task
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
              {tasks.length !== 0 ?
                (<Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleRiminder}
                />)
                : (<p>no tasks to show</p>)
              }
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

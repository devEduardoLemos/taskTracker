// import { useState } from "react";
import { db } from "../config/Firebase"
import { collection, deleteDoc, getDocs, query, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";

// const [taskToEdit, setTaskToEdit] = useState([])

const tasksRepository = collection(db, "tasks");
const getAllTasksDoc = query(tasksRepository);

//get tasks
const getTasks = async () => {
    const data = await getDocs(getAllTasksDoc)
    const treatedData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return treatedData
}



//add task
const addTask = async (task) => {
    await addDoc(tasksRepository, task)
}

//delete task
const deleteTask = async (id) => {
    const taskToDelete = doc(db, "tasks", id)
    await deleteDoc(taskToDelete);
}

//toggle reminder
const toggleRiminder = async (taskId) => {
    const docRef = doc(db, "tasks", taskId);
    const data = await getDoc(docRef);
    const taskToToggle = { ...data.data(), id: taskId }
    const upDateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    updateDoc(docRef, upDateTask)
}

const getTask = async (taskId) => {
    const docRef = doc(db, "tasks", taskId);
    const data = await getDoc(docRef);
    const taskData = { ...data.data(), id: taskId }

    return taskData
}

const updateTask = async (taskId, taskData) => {
    const docRef = doc(db, "tasks", taskId);
    const data = await getDoc(docRef);

    await updateDoc(docRef, taskData)
}

export { getTasks, addTask, deleteTask, toggleRiminder, getTask, tasksRepository, updateTask }
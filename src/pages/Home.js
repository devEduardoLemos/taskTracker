import Tasks from "../components/Tasks";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { getTasks, deleteTask, toggleRiminder, tasksRepository } from "../components/Functions";
import { useNavigate } from "react-router-dom";


export const Home = () => {

    const [tasks, setTasks] = useState([])
    const navigate = useNavigate();

    const loadTasks = async () => {
        const value = await getTasks()
        setTasks(value)
    }

    onSnapshot(tasksRepository, loadTasks())

    useEffect(() => {
        loadTasks()
    }, [])

    const callEdit = (taskId) => {
        navigate("/add", { state: { taskId: taskId } })
    }

    return (
        <div>
            <>
                {tasks.length !== 0 ?
                    (<Tasks
                        tasks={tasks}
                        onDelete={deleteTask}
                        onToggle={toggleRiminder}
                        onEdit={callEdit}
                    />)
                    : (<p>no tasks to show</p>)
                }
            </>
        </div>
    )
}
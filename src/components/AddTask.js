import { useEffect, useState } from "react"
import { addTask, getTask, updateTask } from "./Functions"
import { useLocation, useNavigate } from "react-router-dom"

export const AddTask = () => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    let taskId = null;
    if (location.state && location.state.taskId) {
        taskId = location.state.taskId
    }

    const getTaskToEdit = async () => {
        if (taskId === null) return

        const taskData = await getTask(taskId)
        setText(taskData.text)
        setDay(taskData.day)
        setReminder(taskData.reminder)
    }

    useEffect(() => {
        getTaskToEdit()
    }, [])

    const onSubmit = e => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        taskId === null ? (addTask({ text, day, reminder })) : (updateTask(taskId, { text, day, reminder }))
        navigate("/")

    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input
                    type="datetime-local"
                    placeholder="Add Day & Time"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={e => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type="submit" value="Save Task" className="btn btn-blcok" />
        </form>
    )
}

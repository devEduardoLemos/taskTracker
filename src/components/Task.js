import { FaTimes, FaRegEdit } from 'react-icons/fa'
import { format } from 'date-fns'

const Task = ({ task, onDelete, onToggle, onEdit }) => {

    const dayIntoDate = new Date(task.day)
    const dateIntoText = format(dayIntoDate, "E, MMM do' 'yyyy' at' h:mm a")

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => { onToggle(task.id) }}>
            <h3>
                {task.text}
                <div className='tools' style={{ display: 'flex' }}>
                    <div className='editTool'>
                        <FaRegEdit
                            onClick={() => onEdit(task.id)}
                        />
                    </div>
                    <div className='deleteTool'>
                        <FaTimes
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => onDelete(task.id)}
                        />
                    </div>
                </div>
            </h3>
            <p>{dateIntoText}</p>
        </div>
    )
}

export default Task

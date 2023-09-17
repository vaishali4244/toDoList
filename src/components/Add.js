import React, { useState } from "react";
import './Add.css';

const Add = ({ addTask }) => {
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            addTask(newTask);
            setNewTask("");
        }
    };

    return (
        <div className="add-task">
            <input
                className="input-name"
                type="text"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn-add" onClick={handleAddTask}>Add</button>
        </div>
    );
};
export default Add;
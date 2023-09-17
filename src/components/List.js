import React, { useState, useEffect } from "react";
import axios from 'axios';
import './List.css';

const List = ({ tasks, deleteTask }) => {
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [deletedTask, setDeletedTask] = useState([]);
  
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`, {})
            .then(res => {
                // console.log("all data", res.data);
                const arr = []
                res?.data.map((items, i) => {
                    if (!deletedTask.includes(items?.id)) {
                        arr.push(items);
                    }
                })
                setData(arr);
            }).catch(err => console.log("error", err));
    }, [id, deletedTask])

    const deleted = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                console.log("deleted data", res)
                setDeletedTask([...deletedTask, id]);
            }).catch(err => console.log("error", err));
    }

    const handleTaskStatusChange = (taskId, marked) => {
        const updatedData = data.map((item) =>
            item.id === taskId ? { ...item, completed: !item.completed } : item
        );
        setData(updatedData);
        patch(taskId, !marked);
    }

    const patch = (id, mark) => {
        axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed: mark })
            .then(res => {
                console.log("patched data", res)
                console.log("mark", mark)
            }).catch(err => console.log("error", err));
    }

    return (
        <ul className="task-list">
            {data?.map((task, i) => (
                <li className="li" key={i}>
                    {task?.title}
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={task?.completed}
                        onChange={() => handleTaskStatusChange(task?.id, task?.completed)}
                    />
                    <button
                        className="delete"
                        onClick={() => { setId(task?.id); deleted(task?.id); setDeletedTask([...deletedTask, task?.id]) }}>Delete</button>
                </li>
            ))}

            {tasks.map((task, i) => (
                <li className="li" key={i}>
                    {task}
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={task?.completed}
                        onChange={() => console.log()}
                    />
                    <button className="delete" onClick={() => deleteTask(i)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default List;
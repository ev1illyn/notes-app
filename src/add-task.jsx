import React, { useState } from 'react';

export default function AddTask({ addTask }) {

    const [task, setTask] = useState({ data: "" });


    // funcao executada a cada tecla digitada
    const handleInputChange = e => {
        setTask({ data: e.target.value });
    };

    // funcao executada ao teclar enter
    const submitTask = e => {

        e.preventDefault();
        addTask(task.data);
        setTask({ data: "" });

    };

    return (
        <div className="form-group">
            <form onSubmit={submitTask}>
                <input
                    className="form-control"
                    type="text"
                    value={task.data}
                    placeholder="Type a new task..."
                    onSubmit={submitTask}
                    onChange={handleInputChange}
                ></input>
            </form>
        </div>
    );
}
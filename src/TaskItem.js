
import React, { useState } from "react";

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onToggleCompletion }) => {
  // Ensure these props are defined
  if (!onUpdateTask || !onDeleteTask || !onToggleCompletion) {
    console.error("Missing props in TaskItem:", {
      onUpdateTask,
      onDeleteTask,
      onToggleCompletion,
    });
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    if (onUpdateTask) onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button onClick={() => onToggleCompletion(task.id)}>
            {task.completed ? "Unmark" : "Complete"}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;



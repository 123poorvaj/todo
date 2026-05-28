import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Load tasks from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false, // false = normal, true = strikethrough
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  // Toggle strikethrough (completed)
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Add task on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-success fw-bold">
              📝 Todo App
            </h2>

            {/* Input */}
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn btn-success" onClick={addTask}>
                Add
              </button>
            </div>

            {/* Task count */}
            <p className="text-muted small mb-2">
              Total: {tasks.length} | Done:{" "}
              {tasks.filter((t) => t.completed).length} | Pending:{" "}
              {tasks.filter((t) => !t.completed).length}
            </p>

            {/* Task List */}
            {tasks.length === 0 ? (
              <p className="text-center text-muted">No tasks yet. Add one!</p>
            ) : (
              <ul className="list-group">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-2">
                      {/* Checkbox to toggle strikethrough */}
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      {/* Task text with strikethrough if completed */}
                      <span
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed ? "#aaa" : "#000",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.text}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Clear all completed */}
            {tasks.some((t) => t.completed) && (
              <button
                className="btn btn-outline-secondary btn-sm mt-3 w-100"
                onClick={() => setTasks(tasks.filter((t) => !t.completed))}
              >
                Clear Completed Tasks
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

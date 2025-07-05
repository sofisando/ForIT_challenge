import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import DeleteTask from "./DeleteTask";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Helmet>
        <title>Lista de Tareas</title>
      </Helmet>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold m-6 mb-9 text-gray-800 text-center">📋 Lista de tareas</h1>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No hay tareas aún.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md border border-gray-200"
              >
                {/* Click para ver detalle solo en este span */}
                <span
                  className="flex-1 text-gray-800 text-sm cursor-pointer"
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <strong>{task.title}</strong>: {task.description}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${task.id}`);
                  }}
                  className="text-blue-500 text-sm hover:underline m-4 "
                >
                  Editar
                </button>

                <DeleteTask task={task} setTasks={setTasks} />
              </li>
            ))
          )}
        </ul>

        <button
          onClick={() => navigate(`/create`)}
          className="button-pretty mt-6"
        >
          Añadir tarea
        </button>
      </div>
    </div>
  );
}

export default TaskList;

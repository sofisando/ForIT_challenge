import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Navigate, Link } from "react-router-dom";

function TaskList() {
    const [tasks, setTasks] = useState([]);
  
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
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">📋 Mis Tareas</h1>
          
          <ul className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No hay tareas aún.</p>
            ) : (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md border border-gray-200"
                >
                  <span className="text-gray-800 text-sm">{task.title}</span>
                  <p>{task.description}</p>
                    {/* Acá podrías agregar botones como editar o eliminar */}
                  <button className="text-red-500 text-sm hover:underline">Eliminar</button>
                </li>
              ))
            )}
          </ul>
          <button onClick={() => <Navigate to={`/create`}/>} className="text-sm text-red-500 hover:underline">Añadir tarea</button>
          <Link to={`/create`} className="mt-auto">Añadir tarea</Link>
        </div>
      </div>
    );
  }

export default TaskList;

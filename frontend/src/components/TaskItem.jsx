import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function TaskItem() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => {
        console.error("Error al cargar la tarea:", err);
      });
  }, [id]);

  if (!task) {
    return <p className="text-center mt-10 text-gray-500">Cargando tarea...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Helmet>
        <title>Detalle de Tarea</title>
      </Helmet>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la tarea</h1>

        <div className="mb-4">
          <h2 className="font-semibold text-lg text-gray-700">Título:</h2>
          <p className="text-gray-900">{task.title}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-lg text-gray-700">Descripción:</h2>
          <p className="text-gray-900">{task.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700">Estado:</h2>
          <p className={`font-semibold ${task.completed ? "text-green-600" : "text-yellow-600"}`}>
            {task.completed ? "Completada" : "Pendiente"}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-lg text-gray-700">Creada el:</h2>
          <p className="text-gray-900">
            {new Date(task.createdAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>



        <button
          onClick={() => navigate("/")}
          className="button-pretty mt-2"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

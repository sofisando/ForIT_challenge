import { toast } from 'sonner';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm({ onTaskCreated }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/tasks/${id}`)
        .then(res => res.json())
        .then(task => {
          setTitle(task.title);
          setDescription(task.description);
          setCompleted(task.completed);
        })
        .catch(err => {
          console.error("Error al cargar la tarea:", err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      completed
    };

    const url = id
      ? `http://localhost:3000/api/tasks/${id}`
      : "http://localhost:3000/api/tasks";
    const method = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(id ? "Tarea actualizada con éxito!" : "Tarea creada con éxito!");
        if (!id && onTaskCreated) {
          onTaskCreated(data);
        }
        navigate("/", { replace: true }); // volver al inicio
      } else {
        const errorData = await response.json();
        toast.error("Error del servidor: " + (errorData.message || "No se pudo guardar la tarea"));
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error de red al guardar la tarea.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-pretty mt-9">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        {id ? "Editar Tarea" : "Agregar Nueva Tarea"}
      </h2>

      <div className="infield">
        <input
          type="text"
          value={title}
          placeholder="Nombre"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label></label>
      </div>

      <div className="infield">
        <input
          type="text"
          value={description}
          placeholder="Descripción"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label></label>
      </div>

      <div className="infield">
        <p className="text-sm text-gray-600 mt-1 block">Estado de la tarea</p>
        <select
          value={completed}
          onChange={(e) => setCompleted(e.target.value === "true")}
          className="p-2 border rounded w-full"
        >
          <option value="false">Pendiente</option>
          <option value="true">Completada</option>
        </select>
      </div>


      <button type="submit" className="button-pretty mt-6">
        {id ? "Actualizar Tarea" : "Crear Tarea"}
      </button>
    </form>
  );
}

export default TaskForm;

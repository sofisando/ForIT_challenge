const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

let tasks = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    completed: false,
    createdAt: new Date(),
  },
];

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//endpoints
//todas las tareas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

//agregar una tarea
app.post("/api/tasks", (req, res) => {
  const newTask = { ...req.body, id: tasks.length + 1 , createdAt: new Date()};
  tasks.push(newTask);
  res.send(`Tarea agregada: ${newTask.title}`);
});

//obtener una tarea por ID
app.get("/api/tasks/:id", (req, res) => {
  const taskFound = tasks.find((task) => 
    task.id === parseInt(req.params.id)
);

  if (!taskFound) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  res.json(taskFound);
});

//eliminar una tarea por ID
app.delete("/api/tasks/:id", (req, res) => {
  const taskFound = tasks.find((task) =>
    task.id === parseInt(req.params.id)
  );

  if (!taskFound)
    return res.status(404).json({
      message: "Task not found",
    });
  
  tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.put("/api/tasks/:id", (req, res) => {
  const newData = req.body
  const taskFound = tasks.find((task) =>
    task.id === parseInt(req.params.id)
  );

  if (!taskFound)
    return res.status(404).json({
      message: "Task not found",
    });

  tasks = tasks.map(task => task.id === parseInt(req.params.id) ? {...task, ...newData} : task);
  res.json({
    message: "Task updated successfully"
  });
});

app.listen(3000);
console.log("Server is running on http://localhost:3000");

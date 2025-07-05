import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { toast } from "sonner"


function DeleteTask({ task, setTasks }) {
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'DELETE',
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setTasks((prev) => prev.filter((p) => p.id !== task.id));
            toast.success(`Producto "${task.title}" eliminado con éxito.`)
          } else {
            toast.error(data.message || "Hubo un error al intentar eliminar el producto.");
          }
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
          toast.error("Hubo un problema al intentar eliminar el producto.");
        }
      };
    
      return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className="text-red-500 text-sm hover:underline"
          >
            Eliminar
          </button>
        </AlertDialogTrigger>
      
        <AlertDialogContent className="!bg-white !text-black shadow-lg rounded-lg">
          <AlertDialogHeader className="m-4">
            <AlertDialogTitle className="!text-black">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription className="!text-black">
              <strong>
                Esta acción eliminará el producto "{task.title}" y no se podrá deshacer.
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
      
          <AlertDialogFooter className="m-4">
            <AlertDialogCancel className="bg-gray-200 text-black rounded-md px-3 py-1 hover:bg-gray-300">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600"
              onClick={handleDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
        
      );
}
export default DeleteTask
  

  
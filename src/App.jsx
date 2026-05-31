import { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();
  const [userToEdit, setUserToEdit] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Estados para controlar el Modal personalizado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Sistema de notificaciones temporales
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Manejador único para Crear o Editar desde el formulario
  const handleFormSubmit = async (formData) => {
    if (userToEdit) {
      const res = await editUser(userToEdit.id, formData);
      if (res.success) {
        showToast('¡Usuario actualizado exitosamente!');
        setUserToEdit(null);
      }
      return res;
    } else {
      const res = await addUser(formData);
      if (res.success) {
        showToast('¡Usuario creado de forma exitosa!');
      }
      return res;
    }
  };

  // Flujo para abrir el Modal de eliminación
  const handleOpenDeleteModal = (id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  };

  // Acción definitiva cuando el usuario presiona "Eliminar" en el Modal
  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      const res = await removeUser(userIdToDelete);
      if (res.success) {
        showToast('¡Usuario eliminado correctamente!');
      }
    }
    setIsModalOpen(false);
    setUserIdToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar Superior */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-indigo-600 tracking-tight">
            UniAndes <span className="text-slate-500 font-light">| Gestión de Usuarios</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-600">Docker API Conectada</span>
          </div>
        </div>
      </header>

      {/* Cuerpo Principal */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Notificaciones de éxito */}
        {toastMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-xl shadow-xs">
            {toastMessage}
          </div>
        )}

        {/* Alerta de error de conexión con Docker */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-xl">
            <strong>Error del sistema:</strong> {error}. Asegúrate de que el contenedor Docker esté corriendo.
          </div>
        )}

        {/* Grid responsivo de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <UserForm
              onSubmit={handleFormSubmit}
              userToEdit={userToEdit}
              onCancel={() => setUserToEdit(null)}
            />
          </div>

          {/* Columna Derecha: Tabla de Registros */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold text-slate-700 uppercase tracking-wider text-xs">
                Registros Activos
              </h2>
              <span className="bg-slate-200 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {users.length} Total
              </span>
            </div>

            <UserList
              users={users}
              loading={loading}
              onEdit={(user) => setUserToEdit(user)}
              onDelete={handleOpenDeleteModal} 
            />
          </div>

        </div>
      </main>

      {/* Modal flotante de confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar registro"
        message="¿Estás completamente seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
}
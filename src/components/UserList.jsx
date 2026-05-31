export default function UserList({ users, loading, onEdit, onDelete }) {
  
  // Estado de carga visual (Spinner animado)
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Estado si la base de datos está vacía
  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">No hay usuarios registrados en la base de datos.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4 w-16">#</th> {/* Cambiado ID por '#' para denotar posición secuencial */}
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                {/* 🔄 Aquí calculamos la enumeración dinámica empezando desde 1 */}
                <td className="py-3 px-4 text-slate-400 font-mono font-bold text-xs">
                  {index + 1}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-800">{user.name}</td>
                <td className="py-3 px-4 text-slate-600">{user.email}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-medium py-1.5 px-3 rounded-md transition-colors cursor-pointer"
                    >
                      Editar
                    </button>
                    {/* Seguimos pasando el user.id original al backend para que sepa exactamente cuál borrar */}
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium py-1.5 px-3 rounded-md transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
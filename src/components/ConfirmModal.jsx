export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  // Si el estado "isOpen" es falso, el componente no renderiza absolutamente nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro traslúcido de fondo con desenfoque de cristal (backdrop-blur) */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Ventana del diálogo del Modal */}
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden p-6 relative z-10 transform scale-100 transition-all">
        <div className="flex items-start gap-3">
          {/* Icono de advertencia circular en color rojo */}
          <div className="p-2 bg-red-50 rounded-full text-red-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title || '¿Confirmar acción?'}</h3>
            <p className="text-sm text-slate-500 mt-1">{message}</p>
          </div>
        </div>

        {/* Botonera inferior */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Eliminar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
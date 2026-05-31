import { useState, useEffect } from 'react';

export default function UserForm({ onSubmit, userToEdit, onCancel }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Efecto que reacciona si el usuario presiona "Editar" en la tabla
  useEffect(() => {
    if (userToEdit) {
      setFormData({ name: userToEdit.name, email: userToEdit.email, password: '' });
    } else {
      setFormData({ name: '', email: '', password: '' });
    }
    setErrors({});
    setApiError('');
  }, [userToEdit]);

  // Generador dinámico interno de pruebas (datos aleatorios basados en tiempo)
  const handleAutoFill = () => {
    const idUnico = Date.now();
    setFormData({
      name: `Usuario UniAndes ${idUnico.toString().slice(-4)}`,
      email: `test_${idUnico}@uniandes.edu.co`,
      password: `Pass_${idUnico.toString().slice(-6)}`
    });
    setErrors({});
  };

  // Validaciones del lado del cliente antes del envío
  const validate = () => {
    const localErrors = {};
    if (!formData.name.trim()) localErrors.name = 'El nombre es obligatorio.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      localErrors.email = 'El correo electrónico es requerido.';
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = 'El formato de correo no es válido.';
    }

    if (!userToEdit && (!formData.password || formData.password.length < 6)) {
      localErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setApiError('');
    const payload = { ...formData };
    
    if (userToEdit && !payload.password) {
      delete payload.password;
    }

    const result = await onSubmit(payload);
    if (!result.success) {
      setApiError(result.error); // Pinta errores controlados del backend en Docker (Ej: Email Duplicado)
    } else if (!userToEdit) {
      setFormData({ name: '', email: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">
          {userToEdit ? 'Editar Usuario' : 'Registrar Usuario'}
        </h3>
        {!userToEdit && (
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold py-1 px-2.5 rounded-md transition-colors cursor-pointer border border-indigo-200"
          >
            ⚡ Auto-llenar
          </button>
        )}
      </div>

      {apiError && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          placeholder="Ej. Carlos Mendoza"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          placeholder="carlos@example.com"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Contraseña {userToEdit && <span className="text-xs text-slate-400">(dejar vacío para no alterar)</span>}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
        {userToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
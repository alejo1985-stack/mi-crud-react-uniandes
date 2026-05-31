// URL base de la API corriendo en el contenedor Docker
const BASE_URL = 'http://localhost:8080/api/users';

export const api = {
  // 1. Obtener todos los usuarios (GET)
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener la lista de usuarios.');
    return await res.json();
  },

  // 2. Crear un nuevo usuario (POST)
  create: async (userData) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData), // Envia name, email y password a la API
    });
    
    if (!res.ok) {
      // Captura mensajes de error controlados de la API (ej: Email duplicado)
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al crear el usuario.');
    }
    return await res.json();
  },

  // 3. Actualizar un usuario existente (PUT)
  update: async (id, userData) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar el usuario.');
    }
    return await res.json();
  },

  // 4. Eliminar un usuario (DELETE)
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar el usuario.');
    return true;
  }
};
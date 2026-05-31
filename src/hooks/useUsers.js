import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para leer los usuarios de la API (GET)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carga automática inicial de usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un usuario (POST)
  const addUser = async (userData) => {
    try {
      await api.create(userData);
      await fetchUsers(); // Sincroniza la lista inmediatamente
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Función para editar un usuario (PUT)
  const editUser = async (id, userData) => {
    try {
      await api.update(id, userData);
      await fetchUsers(); // Sincroniza la lista inmediatamente
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Función para eliminar un usuario (DELETE)
  // Nota: Ya no incluye confirm nativo, se ejecuta directamente al confirmar el Modal
  const removeUser = async (id) => {
    try {
      await api.delete(id);
      await fetchUsers(); // Sincroniza la lista inmediatamente
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    refetch: fetchUsers
  };
}
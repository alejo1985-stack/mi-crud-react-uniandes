# Especificación de la API (Endpoints)

Toda la comunicación entre el cliente React y el servidor se realiza mediante peticiones JSON estructuradas a la red local del contenedor Docker.

## 1. Listar Usuarios
- **Endpoint:** `GET http://localhost:8080/api/users`
- **Descripción:** Retorna la colección completa de registros activos en Postgres.

## 2. Crear Usuario
- **Endpoint:** `POST http://localhost:8080/api/users`
- **Payload Requerido (JSON):**
```json
{
  "name": "Alejandro Alfonso",
  "email": "alejo1985ing@gmail.com",
  "password": "securePassword123"
}
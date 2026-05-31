# UniAndes | Sistema de Gestión de Usuarios (CRUD)

Este proyecto es una aplicación web moderna ("Frontend") construida para interactuar con una API de usuarios aislada en un contenedor de infraestructura. Permite realizar operaciones completas de creación, lectura, actualización y eliminación (CRUD).

## 🚀 Arquitectura y Tecnologías

- **Frontend:** React 19 + Vite (Bundler ultra-rápido) + Tailwind CSS v4.
- **Arquitectura:** Diseño basado en componentes controlados, Custom Hooks para la separación de lógica de negocio y capa de servicios para peticiones HTTP nativas (`fetch`).
- **Infraestructura Backend:** API empaquetada en un contenedor **Docker** conectado a una base de datos relacional **PostgreSQL**.
- **Seguridad y Control:** Flujo de eliminación gobernado por un Modal asíncrono personalizado y UI optimizada con índices secuenciales reactivos (`index + 1`).

## 🛠️ Requisitos Previos

Antes de levantar el proyecto, asegúrate de tener instalado en tu sistema:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js (versión LTS)](https://nodejs.org/)

## 📦 Instrucciones de Despliegue Local

### 1. Levantar la Infraestructura (API & DB)
Accede a la carpeta raíz donde se encuentra el archivo `docker-compose.yml` del backend y ejecuta en tu terminal:
```bash
docker compose up --build

---
Desarrollador Fullstack: Alejandro Alfonso Niño
## Parte 2: Implementar VitePress desde Cero (Opción B)

VitePress transformará archivos Markdown en un sitio web de documentación estático y elegante (estilo manual técnico) de manera nativa dentro del ecosistema de Vite.

Sigue estos pasos en tu **segunda terminal (la terminal `fish` de tu Mac)**:

### Paso 1: Instalar VitePress como dependencia de desarrollo
Asegúrate de estar en la raíz de `mi-crud-react` y ejecuta:
```bash
npm add -D vitepress

---

### Paso 4: Probar tu Portal de Documentación Localmente

Para validar cómo luce tu nuevo sitio web técnico de VitePress, ejecuta en tu terminal:
```bash
npm run docs:devgit add .
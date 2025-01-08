Crear Usuario Admin

POST http://localhost:5000/users
Content-Type: application/json

{
    "first_name": "Admin",
    "last_name": "Principal",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
}

Crear Usuario Camper

POST http://localhost:5000/users
Content-Type: application/json

{
    "first_name": "Camper",
    "last_name": "Principal",
    "email": "camper@example.com",
    "password": "camper123",
    "role": "camper"
}

Login (para obtener token)

POST http://localhost:5000/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "admin123"
}

Crear Perfil de Camper (requiere token)

POST http://localhost:5000/campers
Content-Type: application/json
Authorization: Bearer tu_token_aquí

{
    "user_id": 2,  // ID del usuario camper
    "title": "Desarrollador Full Stack",
    "description": "Especializado en MERN Stack",
    "about": "Apasionado por la tecnología y el desarrollo web",
    "image": "https://ejemplo.com/imagen.jpg",
    "main_video_url": "https://youtube.com/watch?v=ejemplo"
}

Actualizar Usuario (requiere token)

PUT http://localhost:5000/users/1
Content-Type: application/json
Authorization: Bearer tu_token_aquí

{
    "first_name": "Admin Actualizado",
    "last_name": "Apellido Actualizado"
}

Obtener Todos los Usuarios (requiere token de admin)

GET http://localhost:5000/users
Authorization: Bearer tu_token_aquí

Obtener Todos los Campers (público)

GET http://localhost:5000/api/campers
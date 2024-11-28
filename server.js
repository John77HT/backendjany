const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Datos simulados para usuarios y mascotas
let usuarios = [
    { id_usuario: 1, nombre: "Juan", apellido: "Pérez", edad: 25, ciudad: "Ciudad A", correo: "juan@example.com", password: "12345" },
    { id_usuario: 2, nombre: "Ana", apellido: "Gómez", edad: 30, ciudad: "Ciudad B", correo: "ana@example.com", password: "67890" },
];

let mascotas = [
    { id_mascota: 1, nombre: "Rex", edad: 5, raza: "Labrador", especie: "Perro" },
    { id_mascota: 2, nombre: "Michi", edad: 3, raza: "Siames", especie: "Gato" },
];

// Función para generar IDs únicos
const generarId = (lista) => (lista.length ? Math.max(...lista.map(item => item.id_usuario || item.id_mascota)) + 1 : 1);

// Rutas para usuarios
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = { ...req.body, id_usuario: generarId(usuarios) };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id_usuario === id);
    if (usuarioIndex >= 0) {
        usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...req.body };
        res.json(usuarios[usuarioIndex]);
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id_usuario !== id);
    res.status(204).send();
});

// Rutas para mascotas
app.get('/api/mascotas', (req, res) => {
    res.json(mascotas);
});

app.post('/api/mascotas', (req, res) => {
    const nuevaMascota = { ...req.body, id_mascota: generarId(mascotas) };
    mascotas.push(nuevaMascota);
    res.status(201).json(nuevaMascota);
});

app.put('/api/mascotas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mascotaIndex = mascotas.findIndex(m => m.id_mascota === id);
    if (mascotaIndex >= 0) {
        mascotas[mascotaIndex] = { ...mascotas[mascotaIndex], ...req.body };
        res.json(mascotas[mascotaIndex]);
    } else {
        res.status(404).json({ error: "Mascota no encontrada" });
    }
});

app.delete('/api/mascotas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    mascotas = mascotas.filter(m => m.id_mascota !== id);
    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

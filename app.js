const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.urlencoded({
    extended: true
}));

const session = require('express-session');

app.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true
}));

// Crear la conexión con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'discoteca',
});

// Establecer la conexión con la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Configuración de la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('index');
});

// Agregar más rutas y controladores según las necesidades de tu proyecto
// Por ejemplo:
app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;
    // Aquí puedes realizar la lógica de autenticación con la base de datos y manejo de sesiones
});

// Manejar la finalización del servidor y cerrar la conexión con la base de datos
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión con la base de datos:', err.message);
        }
        process.exit();
    });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

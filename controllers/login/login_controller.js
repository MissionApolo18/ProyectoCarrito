import express from 'express';
const router = express.Router();

// Ruta para recibir los datos del formulario
router.post('/guardar-cliente', (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, correo, telefono } = req.body;
    
    // Aquí puedes guardar los datos en la base de datos
    console.log(`Cliente guardado: ${nombre} ${apellido_paterno} ${apellido_materno}, Correo: ${correo}, Teléfono: ${telefono}`);

    res.send('Cliente registrado exitosamente');
});

export default router;

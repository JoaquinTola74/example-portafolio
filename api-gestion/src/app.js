require('dotenv').config();
const express = require('express');
const cors=require('cors');
const { swaggerSpec, swaggerUi}= require('./config/swagger');
const usuariosRoute=require('./routes/usuario.routes');

const app=express();
const PORT = process.env.PORT || 3001;

app.get('/',(req,res)=>{
    res.send('Holaaaaaa');
})
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api',usuariosRoute);

app.listen(PORT,()=>{
    console.log(`servidor corriendo en localhost:${PORT}`);
})
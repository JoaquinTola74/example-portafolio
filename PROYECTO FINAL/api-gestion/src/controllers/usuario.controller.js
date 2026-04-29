const prisma = require('../config/prisma');

const getUsuario = async (req, response, next) =>{
    try {
        const usuario=await prisma.usuarios.findMany({
            select: {id:true,nombre:true, email:true, createdAt:true}
        });
        response.json(usuario)
    } catch (error) {
        next(error);
    }
}

module.exports={getUsuario};
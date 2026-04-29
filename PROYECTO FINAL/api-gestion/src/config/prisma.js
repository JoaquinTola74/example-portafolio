const { PrismaClient } = require('@prisma/client');
const {prismaPg} = require('@prisma/adapter-pg');


//const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

module.exports = prisma; 
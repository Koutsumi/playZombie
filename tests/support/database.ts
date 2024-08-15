require('dotenv').config();
import { Pool } from 'pg'

const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    databse: process.env.DB_DATABSE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript){
    try{
        const pool = new Pool(DbConfig);
        const client = await pool.connect();
    
        const result = await client.query(sqlScript);
    }catch(error){
        console.log( 'Erro ao executar o sql' + error)
    }
}
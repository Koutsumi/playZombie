import { Pool } from 'pg'

const DbConfig = {
    user: 'ohrdzfru',
    host: 'isabelle.db.elephantsql.com',
    databse: 'ohrdzfru',
    password: 'q3IMxWcDGls_YxQj1DMed4NpHa0HS2OR',
    port: 5432
}

export async function executeSQL(sqlScript){
    try{
        const pool = new Pool(DbConfig);
        const client = await pool.connect();
    
        const result = await client.query(sqlScript);
        console.log(result)
    }catch(error){
        console.log( 'Erro ao executar o sql' + error)
    }
}
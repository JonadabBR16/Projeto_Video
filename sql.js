import { neon } from "@neondatabase/serverless";
import 'dotenv/config';

// Verifica se a variável de ambiente DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// Conecta ao banco de dados
export const sql = neon(process.env.DATABASE_URL);
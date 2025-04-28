import fastify from "fastify";
import { DatabasePostgres } from "./databasepostgress.js";  // Certifique-se de que o caminho está correto
import cors from '@fastify/cors';

const server = fastify();

// Registro do CORS
await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Corrigido 'methodos' para 'methods'
});

// Instância do banco de dados
const database = new DatabasePostgres();

// Rota para criar um vídeo
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    return reply.status(201).send();
});

// Rota para listar vídeos
server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);

    return videos;
});

// Rota para atualizar um vídeo
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send(); // Resposta de sucesso sem conteúdo
});

// Rota para deletar um vídeo
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});

// Iniciar o servidor
server.listen({
    port: process.env.PORT || 3050,  // Garantir que o valor de PORT seja lido corretamente
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
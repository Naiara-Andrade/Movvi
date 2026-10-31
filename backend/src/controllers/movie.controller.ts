import type { Request, Response } from 'express';

export function createMovie(req: Request, res: Response) {
    const movie = req.body; // acessa os dados enviados pelo frontend.

    res.status(201).json({ // informa que a operação foi bem-sucedida e um recurso foi criado e res.json envia uma resposta no formato JSON.
        message: 'Filme recebido com sucesso!',
        data: movie
    });
}
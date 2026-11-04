import type { Request, Response } from 'express';
import { createMovieService } from '../services/movie.service.js'    

export function createMovie(req: Request, res: Response) {
    
const movie = createMovieService(req.body);


 res.status(201).json({
        message: 'Filme recebido com sucesso!',
        data: movie
    });

}

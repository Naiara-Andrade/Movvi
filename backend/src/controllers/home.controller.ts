import type { Request, Response } from 'express';
import { getHomeMessage } from '../services/home.service.js';

export function home(req: Request, res: Response) {
    res.send(getHomeMessage());
}
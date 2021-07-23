import { NextFunction, Request, Response } from 'express';
import { Route } from './types';

export const route =
  (fn: Route) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

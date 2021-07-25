import { NextFunction, Request, Response } from 'express';

export type Route = (req: Request, res: Response, next: NextFunction) => any;

export interface Req extends Request {
  //   user: IUser;
  user?: any;
}

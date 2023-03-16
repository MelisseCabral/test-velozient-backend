import { HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default async function AuthVerification(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (authorization === undefined || authorization === null) {
    throw new HttpException('Token is null!', HttpStatus.NOT_FOUND);
  }
  if (authorization === 'Bearer') {
    throw new HttpException('Token is requested!', HttpStatus.NOT_FOUND);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const user = jwt.verify(token, process.env.SECRET);
    if (user === undefined || user === null) {
      throw new HttpException('Invalid token!!', HttpStatus.FORBIDDEN);
    } else {
      next();
    }
  } catch {
    throw new HttpException('Invalid token!!', HttpStatus.FORBIDDEN);
  }
}

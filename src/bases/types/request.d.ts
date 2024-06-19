import { Request } from 'express';

declare module 'express' {
  export interface UserPayload {
    id: number;
    username: string;
  }

  export interface Request {
    user: UserPayload;
  }
}

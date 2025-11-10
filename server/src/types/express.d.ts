// Module augmentation for express-serve-static-core so Request imports include `user`.
import type { ParamsDictionary } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface User {
    id: string;
    [key: string]: any;
  }

  interface Request<P = ParamsDictionary> {
    user?: User;
  }
}

export {};

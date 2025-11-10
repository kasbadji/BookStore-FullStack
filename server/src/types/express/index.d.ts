// Augment the express-serve-static-core Request type so imports from 'express'
// pick up the `user` property.
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

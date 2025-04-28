import type { User } from './user';

export type SignInDTO = {
    email: string;
    password: string;
  };

  export type SignUpDTO = {
    email: string;
    name: string;
    password: string;
  };


  export type signInResponse = {
    access_token: string;
    
    user: User;
  };
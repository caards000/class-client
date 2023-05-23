export enum NextAuthStep {
  SIGNUP = "SIGNUP",
  LOGIN = "LOGIN",
}

export type InitAuth = {
  email: string
}

export interface ISignUpRequest {
  email: string;
  token: string;
  fullName: string;
  password: string
}

export interface ILoginRequest {
  email: string;
  password: string
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

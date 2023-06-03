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

export interface IResetPasswordRequest {
  email: string;
}

export interface ISetNewPassword {
  password: string;
  passwordConfirmation: string;
  token: string | null;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ICreateCommunity {
  name: string;
  description: string;
  category: string;
}

export interface IResetPasswordResponse {
  message: string;
}

export interface ISetNewPasswordResponse {
  message: string;
}

export type UserType = {
  id: number,
  fullName: string,
  username: string,
  profileImage: string,
  email: string,
  isEnabled: boolean
}
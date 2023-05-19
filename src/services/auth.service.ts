import {InitAuth, NextAuthStep} from "../types/auth.types";
import apiInstance from "./api";
import {AxiosResponse} from "axios";

class AuthService {
  public async initAuth(data: InitAuth): Promise<NextAuthStep> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/auth/init", data)
        .then(
          (response: AxiosResponse<NextAuthStep>) => {
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }
}

const authService = new AuthService();
export default authService;

import {
  ILoginRequest,
  InitAuth,
  ISignUpRequest,
  ITokenResponse,
  NextAuthStep
} from "../types/auth.types";
import apiInstance, {setAuthToken} from "./api";
import {AxiosResponse} from "axios";
import store from "../redux/store";
import {authActions} from "../redux/slices/authSlice";

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

  public async signup(data: ISignUpRequest): Promise<ITokenResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/auth/signup", data)
        .then((response: AxiosResponse<ITokenResponse>) => {
            this.performLogin(response.data);
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async login(data: ILoginRequest): Promise<ITokenResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/auth/login", data)
        .then((response: AxiosResponse<ITokenResponse>) => {
            this.performLogin(response.data);
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public logout() {
    store.dispatch(authActions.logout());
    setAuthToken();
  }

  public async revalidate() {
    const tokens: ITokenResponse = store.getState().auth.tokens;
    this.performLogin(tokens);
  }

  private performLogin(tokens: ITokenResponse) {
    store.dispatch(authActions.login(tokens));
    setAuthToken(tokens.accessToken);
  }
}

const authService = new AuthService();
export default authService;

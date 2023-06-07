import {
  ILoginRequest,
  InitAuth,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ISetNewPassword,
  ISetNewPasswordResponse,
  ISignUpRequest,
  ITokenResponse,
  NextAuthStep, UpdateUserDetailsRequest, UserType
} from "../types/auth.types";
import apiInstance, {setAuthToken} from "./api";
import {AxiosResponse} from "axios";
import store from "../redux/store";
import {authActions} from "../redux/slices/authSlice";
import communityService from "./community.service";

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
        .then(async (response: AxiosResponse<ITokenResponse>) => {
            await this.performLogin(response.data);
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
        .then(async (response: AxiosResponse<ITokenResponse>) => {
            await this.performLogin(response.data);
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async getUserDetails(): Promise<UserType> {
    return new Promise((resolve, reject) => {
      apiInstance.get("/auth")
        .then((response: AxiosResponse<UserType>) => {
            store.dispatch(authActions.setUserDetails(response.data))
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async updateUserDetails(data: UpdateUserDetailsRequest): Promise<UserType> {
    return new Promise((resolve, reject) => {
      apiInstance.put("/auth", data)
        .then((response: AxiosResponse<UserType>) => {
            store.dispatch(authActions.setUserDetails(response.data))
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async resetPassword(data: IResetPasswordRequest): Promise<IResetPasswordResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/auth/reset-password", data)
        .then((response: AxiosResponse<IResetPasswordResponse>) => {
            return resolve(response.data);
          }
        )
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async setNewPassword(data: Omit<ISetNewPassword, "passwordConfirmation">): Promise<ISetNewPasswordResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/auth/new-password", data)
        .then((response: AxiosResponse<ISetNewPasswordResponse>) => {
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
    await this.performLogin(tokens);
  }

  private async performLogin(tokens: ITokenResponse) {
    if (tokens?.accessToken) {
      store.dispatch(authActions.login(tokens));
      setAuthToken(tokens?.accessToken ? `Bearer ${tokens?.accessToken}` : undefined);

      // init actions
      await this.getUserDetails();
      communityService.getUserCommunities();
    } else {
      this.logout();
    }
  }
}

const authService = new AuthService();
export default authService;

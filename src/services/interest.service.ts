import apiInstance from "./api";
import {AxiosResponse} from "axios";
import {IInterest, InterestRequestType} from "../types/interest.types";
import {PageType} from "../types/page.types";
import store from "../redux/store";
import {authActions} from "../redux/slices/authSlice";

class InterestService {
  public async getAllInterests(): Promise<PageType<IInterest>> {
    return new Promise((resolve, reject) => {
      apiInstance.get("/interest/all")
        .then((res: AxiosResponse<PageType<IInterest>>) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async saveUserInterests(data: InterestRequestType): Promise<IInterest[]> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/interest/user", data)
        .then((res: AxiosResponse<IInterest[]>) => {
          store.dispatch(authActions.setUserInterests(res.data));
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getUserInterests(): Promise<IInterest[]> {
    return new Promise((resolve, reject) => {
      apiInstance.get("/interest/user")
        .then((res: AxiosResponse<IInterest[]>) => {
          store.dispatch(authActions.setUserInterests(res.data));
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}

const interestService = new InterestService();
export default interestService;

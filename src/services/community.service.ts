import {CreateGroupType, GroupType} from "../types/group.types";
import apiInstance from "./api";
import {AxiosResponse} from "axios";
import {PageType} from "../types/page.types";
import store from "../redux/store";
import {groupActions} from "../redux/slices/groupSlice";
import utils from "../utils/utils";
import {activeGroupActions} from "../redux/slices/activeGroupSlice";

class CommunityService {
  createCommunity(data: CreateGroupType): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      apiInstance.post("/group/new", data)
        .then((response: AxiosResponse<GroupType>) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public updateCommunity(data: Omit<GroupType, "authorUsername">): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      apiInstance.patch("/group/update", data)
        .then((response: AxiosResponse<GroupType>) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getCommunity(slug: string): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      apiInstance.get("/group/find", {params: {groupSlug: slug}})
        .then((response: AxiosResponse<GroupType>) => {
          store.dispatch(activeGroupActions.setGroup(response.data))
          this.checkIfUserInGroup(response.data.id);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private checkIfUserInGroup(groupId: number) {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.get("/member/check", {params: {groupId: groupId}})
        .then((response: AxiosResponse<boolean>) => {
          store.dispatch(activeGroupActions.setIsMember(response.data))
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public joinCommunity(groupId: number){
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post("/member/join", groupId)
        .then((response: AxiosResponse<boolean>) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public leaveCommunity(groupId: number){
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post("/member/exit", groupId)
        .then((response: AxiosResponse<boolean>) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getUserCommunities() {
    apiInstance.get("/member/groups")
      .then((response: AxiosResponse<PageType<GroupType>>) => {
        store.dispatch(groupActions.setGroups(response.data));
      })
      .catch((err) => {
        utils.handleRequestError(err);
      });
  }
}

const communityService = new CommunityService();
export default communityService;

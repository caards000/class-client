import {GroupType} from "../types/group.types";
import apiInstance from "./api";
import {AxiosResponse} from "axios";
import {SearchType} from "../types/search.types";

class SearchService {
  public searchForGroup(data: SearchType): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      apiInstance.post("/group/find-by-name", data)
        .then((response: AxiosResponse<GroupType>) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const searchService = new SearchService();
export default searchService;



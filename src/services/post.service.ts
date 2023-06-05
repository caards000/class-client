import {CreatePostType, PostType} from "../types/post.types";
import apiInstance from "./api";
import {AxiosResponse} from "axios";
import {PageType} from "../types/page.types";

class PostService {
  createPost(data: Omit<CreatePostType, "plainText">): Promise<PostType> {
    return new Promise<PostType>((resolve, reject) => {
      apiInstance.post("/post", data)
        .then((response: AxiosResponse<PostType>) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getPost(slug: string): Promise<PostType> {
    return new Promise<PostType>((resolve, reject) => {
      apiInstance.get(`/post/${slug}`)
        .then((response: AxiosResponse<PostType>) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getGroupPosts(groupId: number, page = 0): Promise<PageType<PostType>> {
    return new Promise<PageType<PostType>>((resolve, reject) => {
      apiInstance.get(`/post/group/${groupId}`, {
        params: {
          page: page,
          size: 20,
          sort: "id,desc"
        }
      })
        .then((response: AxiosResponse<PageType<PostType>>) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deletePost(postId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.delete(`/post/${postId}`)
        .then((response: AxiosResponse<string>) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  likePost(postId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post(`/like/${postId}?status=true`)
        .then((res) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  unlikePost(postId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post(`/like/${postId}?status=false`)
        .then((res) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

}

const postService = new PostService();
export default postService;

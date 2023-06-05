import {UserType} from "./auth.types";
import {GroupType} from "./group.types";
import {FileType} from "./file.types";

export type CreatePostType = {
  groupId: number;
  content: string;
  replyId?: number;
  plainText?: string;
}

export type PostType = {
  id: 0,
  slug: string,
  content: string,
  author: UserType,
  group: GroupType,
  files: FileType,
  createdAt: Date,
  likes: number,
  replies: number,
  liked: boolean,
}

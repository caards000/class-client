import React, {useEffect} from 'react';
import CreatePost from "../../components/CreatePost";
import isEmpty from "is-empty";
import {Icon} from "@iconify/react";
import Post from "../../components/Post";
import postService from "../../services/post.service";
import {activeGroupActions} from "../../redux/slices/activeGroupSlice";
import utils from "../../utils/utils";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

interface IProps {
}

function AllCommunityPosts(props: IProps) {
  const dispatch = useAppDispatch();
  const {posts, data} = useAppSelector(state => state.activeGroup);

  useEffect(() => {
    if (data?.id && posts.totalElements === 0) {
      postService.getGroupPosts(data.id)
        .then((res) => {
          dispatch(activeGroupActions.setPosts(res));
        })
        .catch(err => {
          utils.handleRequestError(err);
        })
    }
  }, [data?.id, dispatch, posts.totalElements]);

  return (
    <div>
      {
        !!data && <CreatePost groupId={data.id}/>
      }
      <div className="flex flex-col gap-1 mt-8">
        {
          isEmpty(posts.content) ? (
              <div
                className="flex flex-col items-center justify-center mt-2 border border-slate-200 border-dashed rounded p-5">
                <Icon
                  icon="solar:posts-carousel-vertical-bold-duotone"
                  width={250}
                  height={250}
                  className="text-slate-300"
                />
                <p className="text-slate-500">No posts yet</p>
              </div>
            ) :
            posts.content.map((post) => (
              <Post key={post.id} {...post}/>
            ))
        }
      </div>
    </div>
  );
}

export default AllCommunityPosts;

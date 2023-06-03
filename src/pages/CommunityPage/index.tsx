import React, {useEffect} from 'react';
import Post from "../../components/Post";
import Container from "../../components/Container";
import LeftCol from './LeftCol';
import CreatePost from "../../components/CreatePost";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useParams} from "react-router-dom";
import communityService from "../../services/community.service";
import {activeGroupActions} from "../../redux/slices/activeGroupSlice";
import {Icon} from '@iconify/react';
import isEmpty from "is-empty";
import postService from "../../services/post.service";
import utils from "../../utils/utils";

interface IProps {
}

function CommunityPage(props: IProps) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {posts, data} = useAppSelector(state => state.activeGroup);

  useEffect(() => {
    if (params.slug) {
      communityService.getCommunity(params.slug);
    }

    return () => {
      dispatch(activeGroupActions.removeGroup());
    }
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (data?.id) {
      postService.getGroupPosts(data.id)
        .then((res) => {
          dispatch(activeGroupActions.setPosts(res));
        })
        .catch(err => {
          utils.handleRequestError(err);
        })
    }
  }, [data?.id, dispatch]);

  return (
    <Container className="py-5">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-10">
        <div>
          <LeftCol/>
        </div>
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
                posts.content.map((post, index) => (
                  <Post key={index} {...post}/>
                ))
            }
          </div>
        </div>
        <div>c</div>
      </div>
    </Container>
  );
}

export default CommunityPage;

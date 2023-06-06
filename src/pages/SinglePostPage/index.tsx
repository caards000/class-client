import React, {useEffect, useState} from 'react';
import {PostType} from "../../types/post.types";
import {useParams} from "react-router-dom";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import postService from "../../services/post.service";
import utils from "../../utils/utils";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import {EmptyPage, PageType} from "../../types/page.types";
import isEmpty from "is-empty";

interface IProps {
}

function SinglePostPage(props: IProps) {
  const params = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<PostType>();
  const [comments, setComments] = useState<PageType<PostType>>(EmptyPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.postSlug) {
      postService.getPost(params.postSlug)
        .then((post) => {
          setPost(post)
          setLoading(false);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            setError(err.response.data.message);
          }
          setLoading(false);
          utils.handleRequestError(err)
        })
    }
  }, [params.postSlug]);

  const handleReceiveComment = (comment: PostType) => {
    setComments(prev => ({
      ...prev,
      content: [comment, ...prev.content],
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Icon icon={loadingLoop} width={50} height={50} className="text-slate-300"/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-red-500 rounded-full"></div>
          <div className="w-48 h-24 bg-white bg-opacity-50 -mt-16 backdrop-blur-md"></div>
        </div>
        <p
          className="leading-none text-red-500 bg-red-50 px-2 py-1 rounded typo-subtitle-small">Error
          occurred</p>
        <h3 className="font-extrabold leading-none">{error}</h3>
      </div>
    )
  }

  return (
    <div>
      {
        post && (
          <>
            <Post full {...post}/>
            <div className="my-6">
              <h4 className="mb-2">Comments</h4>
              <CreatePost groupId={post.group.id} replyId={post.id} onSuccess={handleReceiveComment}/>
            </div>
          </>
        )
      }

      <div className="flex flex-col gap-1 mt-8">
        {
          isEmpty(comments.content) ? (
              <div
                className="flex flex-col items-center justify-center mt-2 border border-slate-200 border-dashed rounded p-5">
                <Icon
                  icon="solar:posts-carousel-vertical-bold-duotone"
                  width={250}
                  height={250}
                  className="text-slate-300"
                />
                <p className="text-slate-500">No replies yet</p>
              </div>
            ) :
            comments.content.map((post) => (
              <Post key={post.id} {...post}/>
            ))
        }
      </div>
    </div>
  );
}

export default SinglePostPage;

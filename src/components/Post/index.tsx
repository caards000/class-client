import {useEffect, useState} from "react";
import {PostType} from "../../types/post.types";
import {format, formatDistance} from "date-fns";
import {Icon} from '@iconify/react';
import Button from "../Button";
import hljs from "highlight.js";
import postService from "../../services/post.service";
import Avvvatars from "avvvatars-react";
import {useNavigate} from "react-router-dom";


interface IProps extends PostType {
  full?: boolean;

}

function Post({
                id,
                slug,
                author,
                content,
                createdAt,
                group,
                liked: ld,
                likes: ls,
                replies,
                full
              }: IProps) {

  const navigate = useNavigate();
  const [likes, setLikes] = useState(ls);
  const [liked, setLiked] = useState(ld);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleLike = () => {
    setLiked(prev => !prev);
    if (liked) {
      postService.unlikePost(id)
        .then(() => {
          setLikes(prev => prev - 1);
        })
        .catch();
    } else {
      postService.likePost(id)
        .then(() => {
          setLikes(prev => prev + 1);
        })
        .catch();
    }
  }

  return (
    <div
      className={`flex justify-center gap-4 post ${!full ? `bg-slate-50 p-4 rounded border border-transparent hover:border-slate-200 shadow` : ``}`}>
      {/*<div className="w-10 h-10 rounded-full overflow-hidden">*/}
      {/*  <img className="w-full h-full object-cover"*/}
      {/*       src={author.profileImage || images.UserProfilePicture} alt=""/>*/}
      {/*</div>*/}

      {/* eslint-disable-next-line react/style-prop-object */}
      <Avvvatars style="shape"
                 value={author.fullName}
                 size={40}
                 border
                 borderColor="#24292e22"
                 borderSize={1}
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <p className="typo-body text-slate-800">
            <span className="typo-subtitle mr-1">{author.fullName}</span>
            {!!author.username && <span>@{author.username}</span>}
            <span
              className="typo-body-small text-slate-500">&middot; {
              full ?
                format(new Date(createdAt), "dd MMMM yyyy, hh:mm a") :
                formatDistance(new Date(createdAt), Date.now())
            }</span>
          </p>
          <div className="mb-4 mt-2" dangerouslySetInnerHTML={{__html: content}}/>
        </div>
        <div>
          {/*<img*/}
          {/*  className="w-full aspect-video object-cover object-center mt-3 mb-3 rounded-md"*/}
          {/*  src={images.Saheed}*/}
          {/*  alt=""*/}
          {/*/>*/}
        </div>
        <div className="grid grid-cols-4 items-center">
          <Button
            variant="GHOST"
            size="SMALL"
            className={`${liked ? 'text-red-500' : ''} active:scale-90`}
            onClick={handleLike}
          >
            <Icon
              icon={liked ? "solar:heart-bold" : "solar:heart-outline"}
              width={24}
              height={24}/>
            <span>{likes}</span>
          </Button>

          <Button
            variant="GHOST"
            size="SMALL"
            className="active:scale-90"
            onClick={() => navigate(`/community/${group.slug}/p/${slug}`)}
          >
            <Icon icon="ph:chat-centered" width={24} height={24}/>
            <span>{replies}</span>
          </Button>

          <Button variant="GHOST" size="SMALL" className="active:scale-90">
            <Icon icon="solar:share-outline" width={24} height={24}/>
          </Button>

          <Button variant="GHOST" size="SMALL" className="active:scale-90">
            <Icon icon="solar:menu-dots-bold" width={24} height={24}/>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;

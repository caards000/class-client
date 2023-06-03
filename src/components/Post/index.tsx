import {useEffect} from "react";
import {PostType} from "../../types/post.types";
import images from "../../assets/images";
import {formatDistance} from "date-fns";
import {Icon} from '@iconify/react';
import Button from "../Button";
import hljs from "highlight.js";

interface IProps extends PostType {
}

function Post({author, content, createdAt}: IProps) {

  useEffect(() => {
    hljs.highlightAll();
  }, [])

  return (
    <div
      className="flex justify-center bg-slate-50 p-4 gap-4 rounded border border-transparent hover:border-slate-200 shadow">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img className="w-full h-full object-cover"
             src={author.profileImage || images.UserProfilePicture} alt=""/>
      </div>
      <div className="flex-1 overflow-hidden">
        <div>
          <p className="typo-body text-slate-800">
            <span className="typo-subtitle mr-1">{author.fullName}</span>
            {!!author.username && <span>@{author.username}</span>}
            <span
              className="typo-body-small text-slate-500">&middot; {formatDistance(new Date(createdAt), Date.now())}</span>
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
          <Button variant="GHOST" size="SMALL" className="text-red-500 active:scale-90">
            <Icon icon="solar:heart-bold" width={24} height={24}/>
            <span>127k</span>
          </Button>

          <Button variant="GHOST" size="SMALL" className="active:scale-90">
            <Icon icon="ph:chat-centered" width={24} height={24}/>
            <span>635M</span>
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

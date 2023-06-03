import React from 'react';
import images from "../../assets/images";
import Button from "../Button";
import {GroupType} from "../../types/group.types";
import {Link} from "react-router-dom";

interface IProps extends GroupType {
  showJoinButton?: boolean;
}

function CommunityListItem({showJoinButton, ...props}: IProps) {
  return (
    <Link to={`/community/${props.slug}`}
          className="grid grid-cols-[minmax(0,40px)_minmax(0,1fr)] gap-2 p-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded link-reset">
      <div>
        <div className="w-full aspect-square border border-slate-200 rounded-full overflow-hidden">
          <img src={images.ClassIcon} alt=" " className="w-full h-full object-cover object-center"/>
        </div>
      </div>
      <div>
        <p className="typo-subtitle leading-none mb-1">{props.groupName}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <p className="typo-caption text-slate-500">676 members</p>
          <div className="w-1 h-1 bg-slate-400 rounded-full"/>
          <p className="typo-caption text-slate-500">833,463 posts</p>
        </div>
        {
          showJoinButton && (
            <div className="mt-2">
              <Button variant="PRIMARY" size="SMALL">Join</Button>
            </div>
          )
        }
      </div>
    </Link>
  );
}

export default CommunityListItem;

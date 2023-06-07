import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import isEmpty from "is-empty";
import EmptyCommunity from "../../components/EmptyCommunityList";
import CommunityListItem from "../../components/CommunityListItem";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

interface IProps {
}

function UserCommunities(props: IProps) {
  const {data: {content}, isLoading} = useAppSelector(state => state.group);

  return (
    <div className="mt-20">
      <div className="flex gap-5 justify-between items-center mb-5">
        <h5 className="leading-none">Your Communities</h5>
        <div>
          <Link to="/community/create" className="link-reset">
            <Button size="SMALL" variant="PRIMARY">Create new Community</Button>
          </Link>
        </div>
      </div>

      {
        isLoading ? (
            <div>
              <Icon icon={loadingLoop} width={24} height={24}/>
            </div>
          ) :
          isEmpty(content) ? (
            <div className="mt-2 border border-slate-200 border-dashed rounded p-5">
              <EmptyCommunity message="You don't belong to any community!"/>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {
                content.map((group, index) => (
                  <CommunityListItem key={index} {...group}/>
                ))
              }
            </div>
          )
      }
    </div>
  );
}

export default UserCommunities;

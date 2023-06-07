import React from 'react';
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import CommunityListItem from "../../components/CommunityListItem";
import {useAppSelector} from "../../redux/hooks";
import isEmpty from "is-empty";
import EmptyCommunity from '../../components/EmptyCommunityList';
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";

interface IProps {
}

function LeftCol(props: IProps) {
  const {data: {content}, isLoading} = useAppSelector(state => state.group);

  return (
    <div>
      <h5>Communities</h5>
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
            <div className="flex flex-col gap-2 mt-2">
              {
                content.map((group, index) => (
                  <CommunityListItem key={index} {...group}/>
                ))
              }
            </div>
          )
      }


      <Link to="/community/create" className="link-reset inline-block">
        <Button size="SMALL" variant="PRIMARY" className="mt-4">Create new Community</Button>
      </Link>
    </div>
  );
}

export default LeftCol;

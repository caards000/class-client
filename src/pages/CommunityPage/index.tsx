import React, {useEffect} from 'react';
import Post from "../../components/Post";
import Container from "../../components/Container";
import LeftCol from './LeftCol';
import CreatePost from "../../components/CreatePost";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useParams} from "react-router-dom";
import communityService from "../../services/community.service";
import {activeGroupActions} from "../../redux/slices/activeGroupSlice";

interface IProps {
}

function CommunityPage(props: IProps) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {isLoading, isLoaded, data} = useAppSelector(state => state.activeGroup);

  useEffect(() => {
    if (params.slug) {
      communityService.getCommunity(params.slug);
    }

    return () => {
      dispatch(activeGroupActions.removeGroup());
    }
  }, [dispatch, params.slug]);

  return (
    <Container className="py-5">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-10">
        <div>
          <LeftCol/>
        </div>
        <div>
          <CreatePost/>
          <div className="flex flex-col gap-5 mt-8">
            {
              [...Array(5)].map((_, index) => (
                <>
                  {index !== 0 &&
                      <div key={`${index}-divider`} className="w-full h-[1px] bg-slate-200"/>}
                  <Post key={index}/>
                </>
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

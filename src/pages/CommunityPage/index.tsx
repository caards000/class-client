import React, {useEffect} from 'react';
import Container from "../../components/Container";
import LeftCol from './LeftCol';
import {useAppDispatch} from "../../redux/hooks";
import {Outlet, useParams} from "react-router-dom";
import communityService from "../../services/community.service";
import {activeGroupActions} from "../../redux/slices/activeGroupSlice";
import Sticky from 'react-stickynode';

interface IProps {
}

function CommunityPage(props: IProps) {
  const params = useParams();
  const dispatch = useAppDispatch();

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
      <div
        className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-10 communityContainer">
        <div>
          <Sticky enabled={true} top={90} bottomBoundary=".communityContainer">
            <LeftCol/>
          </Sticky>
        </div>
        <div>
          <Outlet/>
        </div>
        <div>c</div>
      </div>
    </Container>
  );
}

export default CommunityPage;

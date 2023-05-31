import {Icon} from '@iconify/react';
import React, {useRef, useState} from 'react';
import images from "../../assets/images";
import Button from "../../components/Button";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Skeleton from "react-loading-skeleton";
import communityService from "../../services/community.service";
import utils from "../../utils/utils";
import {activeGroupActions} from "../../redux/slices/activeGroupSlice";

interface IProps {
}

function LeftCol(props: IProps) {
  const {isLoading, data, isMember} = useAppSelector(state => state.activeGroup);
  const dispatch = useAppDispatch();
  const [joiningOrExitingGroup, setJoiningOrExitingGroup] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<any>();

  const copyLink = () => {
    setCopied(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  const joinGroup = async () => {
    if (data && !joiningOrExitingGroup) {
      communityService.joinCommunity(data.id)
        .then(() => {
          dispatch(activeGroupActions.setIsMember(true));
        })
        .catch(err => {
          utils.handleRequestError(err);
        });
    }
  }

  const exitGroup = async () => {
    if (data && !joiningOrExitingGroup) {
      communityService.leaveCommunity(data.id)
        .then(() => {
          dispatch(activeGroupActions.setIsMember(false));
        })
        .catch(err => {
          utils.handleRequestError(err);
        });
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className="w-full aspect-[5/2] rounded overflow-hidden mb-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <Skeleton height={40} width="70%"/>
        <div className="flex flex-wrap gap-2 items-center">
          <Skeleton width={80}/>
          <Skeleton width={80}/>
        </div>

        <div className="mt-4">
          <Skeleton width={80}/>
          <Skeleton count={4}/>
        </div>

        <div className="mt-3">
          <Skeleton width={80}/>
          <Skeleton width={120}/>
        </div>

        <div className="mt-5">
          <Skeleton height={40}/>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-full aspect-[5/2] rounded overflow-hidden mb-2">
        <img
          src={images.UserProfilePicture}
          alt=" "
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h3>{data?.groupName}</h3>
      <div className="flex flex-wrap gap-2 items-center">
        <p className="typo-body-small text-slate-500">676 members</p>
        <div className="w-1 h-1 bg-slate-400 rounded-full"/>
        <p className="typo-body-small text-slate-500">833,463 posts</p>
      </div>

      <div className="mt-4">
        <p className="typo-subtitle-small text-gray-900">Description</p>
        <p className="typo-body-small text-slate-500">
          {data?.description}
        </p>
      </div>

      <div className="mt-3">
        <p className="typo-subtitle-small text-gray-900">Share</p>

        <Button size="SMALL" variant="GHOST" onClick={copyLink}>
          <Icon icon={copied ? "solar:clipboard-check-bold" : "ci:link"}
                className={copied ? "text-green-600" : ""} width={20}/> <span
          className="typo-body-small">Copy link</span>
        </Button>
      </div>

      <div className="mt-5">
        {
          isMember ? (
            <Button
              variant="DANGER"
              className="w-full"
              outline
              onClick={exitGroup}
            >
              Exit Community
            </Button>
          ) : (
            <Button
              variant="PRIMARY"
              className="w-full"
              onClick={joinGroup}
              loading={joiningOrExitingGroup}
            >
              Join Community
            </Button>
          )
        }
      </div>

    </div>
  );
}

export default LeftCol;

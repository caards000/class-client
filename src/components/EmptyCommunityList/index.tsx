import {Icon} from '@iconify/react';
import React from 'react';

interface IProps {
  message?: string;
}

function EmptyCommunity({message}: IProps) {
  return (
    <div className="text-center flex flex-col gap-3 items-center justify-center">
      <p className="text-slate-400"><Icon icon="fluent:group-list-20-regular" width={50} height={50}/></p>
      <p className="typo-body-small text-slate-500">{message || "No community found!"}</p>
    </div>
  );
}

export default EmptyCommunity;

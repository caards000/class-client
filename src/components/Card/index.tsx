import React, {HTMLAttributes} from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
}

function Card({className, children, ...props}: IProps) {
  return (
    <div className={`bg-white border border-slate-100 rounded drop-shadow-lg p-8 ${className}`}>
      {children}
    </div>
  );
}

export default Card;

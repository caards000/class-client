import React, {HTMLAttributes} from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
}

function Container({children, className, ...props}: IProps) {
  return (
    <div className={`w-full max-w-screen-2xl mx-auto px-5 ${className}`} {...props}>{children}</div>
  );
}

export default Container;

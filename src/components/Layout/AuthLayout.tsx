import React from 'react';
import {Outlet} from "react-router-dom";

interface IProps {
}

function AuthLayout(props: IProps) {
  return (
    <div className="flex gap-5 min-h-screen items-stretch">
      <div className="w-full bg-primary-normal"></div>
      <div className="w-full max-w-3xl">
        <div className="flex min-h-full flex-col items-center justify-center">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

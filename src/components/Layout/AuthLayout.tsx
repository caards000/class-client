import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import images from "../../assets/images";
import {useAppSelector} from "../../redux/hooks";

interface IProps {
}

function AuthLayout(props: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex gap-5 min-h-screen items-stretch">
      <div className="w-full bg-primary-normal overflow-hidden relative">
        <img src={images.ClassIcon} alt=" " className="w-[140%] absolute top-[-3%] max-w-[unset]"/>
      </div>
      <div className="w-full max-w-3xl">
        <div className="flex min-h-full flex-col items-center justify-center">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

import React, {useEffect} from 'react';
import Header from "../Header/Header";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import SearchBar from "../SearchBar";

interface IProps {
}

function Layout(props: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Layout;

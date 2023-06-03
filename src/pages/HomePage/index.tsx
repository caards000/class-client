import React, {useEffect} from 'react';
import {useAppSelector} from "../../redux/hooks";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import HomePageComponent from "./HomePageComponent";
import communityService from "../../services/community.service";

interface IProps {
}

function HomePage(props: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    isAuthenticated && communityService.getUserCommunities();
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <HomePageComponent/>
      ) : (
        <div>
          <h1>Not logged in</h1>
          <Link to="/auth"><Button>Login</Button></Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
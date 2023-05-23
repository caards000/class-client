import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import Button from "../../components/Button";
import authService from "../../services/auth.service";
import {Link} from "react-router-dom";

interface IProps {
}

function HomePage(props: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth);

  return (
    <div>
      <h1>Home page</h1>
      {isAuthenticated ? (
        <div>
          <h1>Logged in</h1>
          <Button onClick={authService.logout}>Logout</Button>
        </div>
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
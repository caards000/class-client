import React from 'react';
import Container from "../../components/Container";
import UserCommunities from "./UserCommunities";
import UserDetails from "./UserDetails";
import UserInterests from "./UserInterests";

interface IProps {
}

function ProfilePage(props: IProps) {


  return (
    <Container className="mt-5">
      <UserDetails/>

      <div className="mt-10">
        <UserInterests/>
        <UserCommunities/>
      </div>
    </Container>
  );
}

export default ProfilePage;

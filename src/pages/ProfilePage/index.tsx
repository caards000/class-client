import React from 'react';
import Container from "../../components/Container";
import Button from "../../components/Button";
import UserCommunities from "./UserCommunities";
import UserDetails from "./UserDetails";

interface IProps {
}

function ProfilePage(props: IProps) {


  return (
    <Container className="mt-5">
      <UserDetails/>

      <div className="mt-10">
        <div className="flex gap-5 justify-between">
          <h5>Your Interests</h5>
          <div>
            <Button size="SMALL" variant="PRIMARY">Update</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {
            [...Array(10)].map((_, index) => (
              <div key={index} className="border border-slate-200 px-4 py-4 rounded shadow">
                <p className="leading-none">Front end development</p>
              </div>
            ))
          }
        </div>

        <UserCommunities/>
      </div>
    </Container>
  );
}

export default ProfilePage;

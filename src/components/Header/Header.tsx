import React from 'react';
import images from "../../assets/images";
import {Link} from "react-router-dom";
import Container from "../Container";
import Button from "../Button";
import {Icon} from '@iconify/react';
import {useAppSelector} from "../../redux/hooks";
import authService from "../../services/auth.service";
import SearchBar from "../SearchBar";

interface IProps {
}

function Header(props: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth)

  return (
    <>
      <header
        className="w-full border-b shadow shadow-xl bg-white h-[50px] fixed top-0 left-0 right-0 z-20">
        <Container className="flex align-stretch justify-between h-full">
          <div>
            <Link to="/" className="flex items-center h-full">
              <img src={images.ClassLogo} alt=" " className="h-6"/>
            </Link>
          </div>

          <div>
            <ul className="flex h-full items-center gap-3">
              <SearchBar/>
              {
                isAuthenticated ? (
                  <>
                    <li>
                      <Link to="">
                        <img src={images.UserProfilePicture} alt=" "
                             className="w-8 aspect-square rounded"/>
                      </Link>
                    </li>
                    <li>
                      <Button size="SMALL" variant="GHOST" onClick={authService.logout}>
                        <Icon
                          icon="solar:logout-3-bold-duotone"
                          width={24}
                          height={24}
                          hFlip={true}
                        />
                        <span>Logout</span>
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/auth">
                        <Button size="SMALL">Login</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth">
                        <Button size="SMALL" variant="PRIMARY">Signup</Button>
                      </Link>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </Container>
      </header>
      <div className="w-full h-[70px]"/>
    </>
  );
}

export default Header;
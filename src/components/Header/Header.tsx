import React from 'react';
import './style.scss'; // Import the CSS file for styling
import { FaEnvelope, FaPlus, FaBell } from 'react-icons/fa';
import classLogo from "../../assets/images/ClassLogo.svg"

interface IProps {
}

function Header(props: IProps) {
    return (
        <div className="w-full flex-justify-between bg-blue-800 custom-width m-0">
            <div className="w-full flex justify-start ">
                <img src={classLogo} alt="class-logo" className="w-20"/>
            </div>
            <div className="w-full flex justify-end">
                <div className="flex items-center">
                    <FaEnvelope title="Messages" className="mx-4" />
                    <FaPlus title="Add" className="mx-4" />
                    <FaBell title="Notifications" className="mx-4" />
                </div>
            </div>
        </div>

    );
}

export default Header;
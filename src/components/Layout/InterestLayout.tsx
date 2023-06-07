import React from 'react';
import {Outlet} from "react-router-dom";



interface IProps {
}



function InterestLayout(props: IProps) {
    return (
        <div className="w-full max-w-5xl">
            <div className="flex gap-x-32 min-h-screen justify-items-center">
                <div className="max-w-full bg-primary-normal"></div>
                <div className="flex min-h-full flex-col items-center justify-center">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default InterestLayout;
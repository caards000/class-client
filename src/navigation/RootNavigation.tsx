import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PreAuthPage from "../pages/PreAuthPage";
import AuthLayout from "../components/Layout/AuthLayout";
import SignupPage from "../pages/SignupPage";
import CreateCommunity from "../pages/CreateCommunity";
import CommunityLayout from "../components/Layout/CommunityLayout";

interface IProps {
}

function RootNavigation(props: IProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route element={<CommunityLayout/>}>
                    <Route path="/create" element={<CreateCommunity/>}/>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth">
                        <Route path="" element={<PreAuthPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="signup" element={<SignupPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RootNavigation;
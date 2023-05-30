import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PreAuthPage from "../pages/PreAuthPage";
import AuthLayout from "../components/Layout/AuthLayout";
import SignupPage from "../pages/SignupPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SetNewPasswordPage from "../pages/SetNewPasswordPage";
import Post from "../components/Post";

interface IProps {
}

function RootNavigation(props: IProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route element={<AuthLayout/>}>
          <Route path="/auth">
            <Route path="" element={<PreAuthPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
            <Route path="reset-password" element={<ResetPasswordPage/>}/>
            <Route path="new-password" element={<SetNewPasswordPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigation;
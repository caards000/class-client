import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PreAuthPage from "../pages/PreAuthPage";
import AuthLayout from "../components/Layout/AuthLayout";

interface IProps {
}

function RootNavigation(props: IProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

        <Route element={<AuthLayout/>}>
          <Route path="/auth" element={<PreAuthPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigation;
import React from 'react';
import RootNavigation from "./navigation/RootNavigation";
import {Toaster} from "react-hot-toast";


function App() {
  return (
    <>
      <RootNavigation/>
      <Toaster toastOptions={{
        position: "bottom-left",
        duration: 10_000,
      }}/>
    </>
  );
}

export default App;

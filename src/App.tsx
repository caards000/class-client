import React from 'react';
import RootNavigation from "./navigation/RootNavigation";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}

export default App;

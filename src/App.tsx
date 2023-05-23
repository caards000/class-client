import React from 'react';
import RootNavigation from "./navigation/RootNavigation";
import {Toaster} from "react-hot-toast";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./redux/store";
import {Provider} from "react-redux";
import authService from "./services/auth.service";


function App() {
  return (
    <PersistGate
      onBeforeLift={async () => await authService.revalidate()}
      persistor={persistor}
    >
      <Provider store={store}>
        <RootNavigation/>
        <Toaster toastOptions={{
          position: "bottom-left",
          duration: 10_000,
        }}/>
      </Provider>
    </PersistGate>
  );
}

export default App;

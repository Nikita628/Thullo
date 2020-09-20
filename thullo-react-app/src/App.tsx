import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import Auth from './components/auth/Auth/Auth';
import Layout from './components/common/Layout/Layout';
import NotificationQueue from './components/common/NotificationQueue/NotificationQueue';
import { AppState } from './state';
import { actionCreators } from "./state/auth";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    dispatch(actionCreators.SignInFromLocalStorageRequested());
  }, []);

  if (authState.isSignedIn) {
    return (
      <>
        <NotificationQueue />
        <Layout />
      </>
    );
  } else if (authState.hasFailedToSignInFromLocalStorage) {
    return (
      <>
        <NotificationQueue />
        <Auth />
      </>
    );
  }

  return null;
}

export default App;

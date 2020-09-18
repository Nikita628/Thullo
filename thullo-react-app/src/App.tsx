import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import Auth from './components/auth/Auth/Auth';
import Layout from './components/common/Layout/Layout';
import { AppState } from './state';
import { actionCreators } from "./state/auth";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    dispatch(actionCreators.SignInFromLocalStorageRequested());
  }, []);

  if (authState.isSignedIn) {
    return <Layout />
  } else if (authState.hasFailedToSignInFromLocalStorage) {
    return <Auth />
  }
  
  return null;
}

export default App;

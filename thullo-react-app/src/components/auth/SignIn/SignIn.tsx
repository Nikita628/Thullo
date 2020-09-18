import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import css from './SignIn.module.css';
import { AppState } from "../../../state";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { SignInData } from "../../../models/auth";
import { actionCreators } from "../../../state/auth";

const SignIn = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const signInData = new SignInData();
    signInData.login = email;
    signInData.password = password;
    dispatch(actionCreators.SignInRequested(signInData));
  }

  return (
    <div className={css.signIn}>
      <h3 className={css.signInHeader}>Sign In</h3>
      <form>
        <div className={css.formGroup}>
          <label className={css.formLabel}>Email</label>
          <Input type="email" value={email} onChange={onEmailChange} className={css.formInput} />
        </div>
        <div className={css.formGroup}>
          <label className={css.formLabel}>Password</label>
          <Input type="password" value={password} onChange={onPasswordChange} className={css.formInput} />
        </div>
        {
          authState.signInErrors
          ? <p className={css.errorText}>Incorrect email and/or password.</p>
          : null
        }
        <div className={css.signInButton}>
          <Button onClick={onSignInClick} type="primary">Sign In</Button>
        </div>
      </form>
      <p className={css.already}>Don't have an account? Sign up <Link to="/signup">here</Link></p>
    </div>
  );
}

export default SignIn;
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Auth = () => {
    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Switch>
                        <Route path="/signin" exact component={SignIn} />
                        <Route path="/signup" exact component={SignUp} />
                        <Redirect from="/" to="/signin" />
                    </Switch>
                </div>
            </div>
        </main>
    );
}

export default Auth;
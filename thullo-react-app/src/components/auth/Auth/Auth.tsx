import React from 'react';
import SignUp from '../SignUp/SignUp';
import css from './Auth.module.css';

const Auth = () => {
    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignUp />
                </div>
            </div>
        </main>
    );
}

export default Auth;
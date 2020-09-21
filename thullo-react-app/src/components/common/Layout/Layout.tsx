import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AllBoards from '../../board/AllBoards/AllBoards';
import TopNav from '../TopNav/TopNav';
import css from './Layout.module.css';

interface LayoutProps {
    className?: string;
    style?: any;
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            <header>
                <TopNav />
            </header>
            <main className={css.main}>
                <Switch>
                    <Route path="/boards" exact component={AllBoards} />
                    <Redirect from="/" to="boards" />
                </Switch>
            </main>
            <footer className={css.footer}>
                <p className="mb-0 text-center text-muted">&copy; {new Date().getFullYear()} Thullo </p>
            </footer>
        </>
    );
}

export default Layout;
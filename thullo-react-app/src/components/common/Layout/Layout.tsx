import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { BaseProps } from '../../../common/data';
import AllBoards from '../../board/AllBoards/AllBoards';
import BoardDetails from '../../board/BoardDetails/BoardDetails';
import TopNav from '../TopNav/TopNav';
import css from './Layout.module.css';

interface LayoutProps extends BaseProps {
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
                    <Route path="/board/:id" exact component={BoardDetails} />
                    <Redirect from="/" to="/boards" />
                </Switch>
            </main>
            <footer className={css.footer}>
                <p className="mb-0 text-center text-muted">&copy; {new Date().getFullYear()} Thullo </p>
            </footer>
        </>
    );
}

export default Layout;
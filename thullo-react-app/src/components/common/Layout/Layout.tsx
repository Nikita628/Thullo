import React from 'react';
import SignUp from '../../auth/SignUp/SignUp';
import css from './Layout.module.css';

interface LayoutProps {
    className?: string;
    style?: any;
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <div>
            <header>
                top nav
            </header>
            <main className="container">
                main
            </main>
            <footer>
                footer
            </footer>
        </div>
    );
}

export default Layout;
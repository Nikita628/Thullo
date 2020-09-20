import React from 'react';
import TopNav from '../TopNav/TopNav';
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
                <TopNav />
            </header>
            <main>
                main
            </main>
            <footer>
                footer
            </footer>
        </div>
    );
}

export default Layout;
import React, { FC } from 'react';
import NavHeader from './NavHeader';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavHeader />
            <main
                className="relative flex-grow"
                style={{
                    minHeight: '-webkit-fill-available',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;

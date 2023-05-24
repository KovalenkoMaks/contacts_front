import React from 'react';
import Header from 'components/header/Header';
import { Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
const Layout = () => {
    return (
        <div className="container ">
            <Header />
            <p className="badge bg-primary text-end  ">We can help you to order your contacts!</p>
            <Outlet />
        </div>
    );
};

export default Layout;

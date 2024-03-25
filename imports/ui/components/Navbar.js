import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <Link to="/clients">
                CLIENTS
            </Link>
            <Link to="/deposits">
                DEPOSITS
            </Link>
            <Link to="/client_account">
                CLIENT ACCOUNTS
            </Link>
            <LogoutButton />
        </div>
    );
};

export default Navbar;

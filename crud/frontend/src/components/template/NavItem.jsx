import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, icon, title }) => (
    <Link to={to} className="nav-link">
        <i className={`fa fa-${icon}`}></i> {title}
    </Link>
);

export default NavItem;

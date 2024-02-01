import './Nav.css';
import React from 'react';
import NavItem from './NavItem';

const Nav = () => (
    <aside className="menu-area">
        <nav className="menu">
            <NavItem to="/" icon="home" title="Início" />
            <NavItem to="/users" icon="users" title="Usuário" />
        </nav>
    </aside>
);

export default Nav;

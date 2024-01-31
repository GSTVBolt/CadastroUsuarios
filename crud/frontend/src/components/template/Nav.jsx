import './Nav.css'
import React from 'react'
import NavItem from '../NavItem'

const Nav = props =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem href="#/" icon="home" title="Início" />
            <NavItem href="#/Users" icon="users" title="Usuário" />
        </nav>
    </aside>

export default Nav
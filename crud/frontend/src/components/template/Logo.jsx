import './Logo.css'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
// import { Link } from 'react-router-dom'

const Logo = props =>
    <aside className='logo'>
        <a href='/' className='logo'>
          <img src={logo} alt='logo'/>  
        </a>
    </aside>

export default Logo
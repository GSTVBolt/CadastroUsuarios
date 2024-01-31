import React from 'react'
 
const NavItem = props => 
<a href={`${props.href}`}>
    <i className={`fa fa-${props.icon}`}></i> {props.title}
</a>

export default NavItem

import { useState } from 'react';
import '../../styles/admin/admin_leftnav.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function AdminLeftNav({ setTabSelect }) {

    const [showmenu, setShowMenu] = useState(true);


    const showMenu = (e) => {
        if (window.innerWidth >= 800) return;
        // setShowMenu(prev => !prev);
        setShowMenu(!showmenu);
    }

    return (
        <>
            <aside className={`adminaside ${showmenu? 'showMenu':'hideMenu'}`}>
                <i class="fa-solid fa-bars menubar" onClick={showMenu}></i>
                <h2 className='appName'>G <span>Mall</span></h2>
                <span className='span'>Admin Panel</span>
                <ul className='ul'>
                    <li onClick={() => setTabSelect('Admin Dashboard')}><Link to="/">Dashboard</Link></li>
                    <li onClick={() => setTabSelect('Users & Sellers')}><Link to="/usersAndSellers">Users & Sellers</Link></li>
                    <li onClick={() => setTabSelect('Products')}><Link to="/adminProducts">Products</Link></li>
                    <li onClick={() => setTabSelect('Categories')}><Link to="adminCategories">Categories</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default AdminLeftNav;
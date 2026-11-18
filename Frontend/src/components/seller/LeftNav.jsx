
import { useState } from 'react';
import '../../styles/seller/leftnav.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function LeftNav(){

     const [showmenu, setShowMenu] = useState(true);


    const showMenu = (e) => {
        if (window.innerWidth >= 800) return;
        // setShowMenu(prev => !prev);
        setShowMenu(!showmenu);
    }

    return(
        <>
            <aside className={`selleraside ${showmenu? 'showMenu':'hideMenu'}`}>
                <i class="fa-solid fa-bars menubar" onClick={showMenu}></i>
                <h2>G <span>Mall</span></h2>
                <span>Seller Panel</span>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/myProducts">My Products</Link></li>
                    <li><Link to="/addProducts">Add Products</Link></li>
                    <li><Link to="sellerChat">Chat</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default LeftNav;
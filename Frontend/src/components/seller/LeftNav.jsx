
import '../../styles/seller/leftnav.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function LeftNav(){
    return(
        <>
            <aside className='selleraside'>
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
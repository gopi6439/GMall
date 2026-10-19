
import '../../styles/admin/admin_leftnav.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function AdminLeftNav({setTabSelect}){
    return(
        <>
            <aside className='adminaside'>
                <h2>G <span>Mall</span></h2>
                <span>Seller Panel</span>
                <ul>
                    <li onClick={()=>setTabSelect('Admin Dashboard')}><Link to="/">Dashboard</Link></li>
                    <li onClick={()=>setTabSelect('Users & Sellers')}><Link to="/usersAndSellers">Users & Sellers</Link></li>
                    <li onClick={()=>setTabSelect('Products')}><Link to="/adminProducts">Products</Link></li>
                    <li onClick={()=>setTabSelect('Categories')}><Link to="adminCategories">Categories</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default AdminLeftNav;
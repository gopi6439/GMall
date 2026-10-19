import '../../styles/admin/admin_profile.css'

import { useEffect, useState } from 'react';

function AdminProfile({setShowProfileCard,adminData,setLogged}){

     const logout = (e)=>{
        e.preventDefault();
        localStorage.clear();
        setLogged(false);
    }

    return(
        <>
            <div className='adminprofileCard'>
                <div className='cancel' onClick={()=>setShowProfileCard(false)}><i class="fa-solid fa-circle-xmark"></i></div>
                <div className='ptop'>
                    <img src={adminData.profileImage} alt="no" />
                    <div>
                        <h3>{adminData.fullName}</h3>
                        <span>{adminData.role}</span>
                    </div>
                </div>

                <div className='line'></div>

                <div className='cd'><i className="fa-regular fa-envelope"></i><span>{adminData.email}</span></div>
                <div className='cd'><i className="fa-solid fa-phone"></i><span>{adminData.phone}</span></div>
                <div style={adminData.location == undefined ? { display: 'none' } : { display: 'block' }} className='cd'><i className="fa-solid fa-location-dot"></i><span>{adminData.location}</span></div>
                <div>
                    <button>Edit Profile</button>
                    <button onClick={logout}>Logout</button>
                </div>

            </div>
        </>
    )
}

export default AdminProfile;
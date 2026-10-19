
import '../../styles/seller/seller_profile.css';

import { useEffect, useState } from 'react';

function SellerProfile({setShowProfileCard,sellerData,setLogged}){

     const logout = (e)=>{
        e.preventDefault();
        localStorage.clear();
        setLogged(false);
    }

    return(
        <>
            <div className='profileCard'>
                <div className='cancel' onClick={()=>setShowProfileCard(false)}><i class="fa-solid fa-circle-xmark"></i></div>
                <div className='top'>
                    <img src={sellerData.profileImage} alt="no" />
                    <div>
                        <h3>{sellerData.fullName}</h3>
                        <span>{sellerData.role}</span>
                    </div>
                </div>

                <div className='line'></div>

                <div className='cd'><i className="fa-regular fa-envelope"></i><span>{sellerData.email}</span></div>
                <div className='cd'><i className="fa-solid fa-phone"></i><span>{sellerData.phone}</span></div>
                <div style={sellerData.location == undefined ? { display: 'none' } : { display: 'block' }} className='cd'><i className="fa-solid fa-location-dot"></i><span>{sellerData.location}</span></div>
                <div>
                    <button>Edit Profile</button>
                    <button onClick={(e)=>logout(e)}>Logout</button>
                </div>

            </div>
        </>
    )
}

export default SellerProfile;
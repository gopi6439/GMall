
import '../../styles/customer/customer_profile.css';

import { useEffect, useState } from 'react';

function CustomerProfile({ setShowProfileCard, user, setLogged }) {

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        setLogged(false);
    }

    return (
        <>
            <div className='cutomerprofileCard'>
                <div className='cancel' onClick={() => setShowProfileCard(false)}><i class="fa-solid fa-circle-xmark"></i></div>
                <div className='top'>
                    <img src={user.profileImage} alt="no" />
                    <div>
                        <h3>{user.fullName}</h3>
                        <span>{user.role}</span>
                    </div>
                </div>

                <div className='line'></div>

                <div className='cd'><i className="fa-regular fa-envelope"></i><span>{user.email}</span></div>
                <div className='cd'><i className="fa-solid fa-phone"></i><span>{user.phone}</span></div>
                <div style={user.location == undefined ? { display: 'none' } : { display: 'block' }} className='cd'><i className="fa-solid fa-location-dot"></i><span>{user.location}</span></div>
                <div>
                    <button>Edit Profile</button>
                    <button onClick={logout}>Logout</button>
                </div>

            </div>
        </>
    )
}

export default CustomerProfile;
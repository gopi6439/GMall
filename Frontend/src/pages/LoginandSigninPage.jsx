

import bags from '../assets/login_page_images/bags.png';
import smartphone from '../assets/login_page_images/smartphone.png'
import shoes from '../assets/login_page_images/shoes.png'
import lamp from '../assets/login_page_images/lamp.png'
import { useState } from 'react';
import LoginComp from '../components/LoginComp';
import SigninComp from '../components/SigninComp';

function LoginandSigninPage({setLogged}) {

    const[loginState,setLoginState]=useState(false);

  return (
    <>
    <div className="logincontainer">
    <div className="left">
        <h2>G<span style={{color:"orange"}}>Mall</span></h2>
        <h3>Shop, sell and chat in one marketplace</h3>
        <p>Customers find products and talk to sellers, Sellers run their own stall.Admins keep everything in order.</p>
        <div>
            <img src={bags} alt="no" />
            <img src={smartphone} alt="no" />
            <img src={shoes} alt="no" />
            <img src={lamp} alt="no" />
        </div>
    </div>
    
    {loginState && <LoginComp loginState={loginState} setLoginState={setLoginState} setLogged={setLogged}/>}
    {!loginState && <SigninComp loginState={loginState} setLoginState={setLoginState} setLogged={setLogged}/>}
    
</div>

    </>
   
  );
}

export default LoginandSigninPage;
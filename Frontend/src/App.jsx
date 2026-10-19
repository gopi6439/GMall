import { useState } from 'react'

import './App.css'
import LoginandSigninPage from './pages/LoginandSigninPage.jsx'
import Customer from './pages/Customer.jsx'
import Nav from './components/customer/Nav.jsx'
import Seller from './pages/Seller.jsx'
import Admin from './pages/Admin.jsx'
import sampleImage from './assets/sample_product_images/avatar.png'
import smartphone from './assets/login_page_images/smartphone.png'
import bags from './assets/login_page_images/bags.png';
import shoes from './assets/login_page_images/shoes.png'

import API_BASE_URL from './API.js'


function App() {

  const [loggedin, setLoggedin] = useState(() => 
    localStorage.getItem("LOGGEDIN") === "true");

  return (
    <>
      {!loggedin && <LoginandSigninPage setLogged={setLoggedin} />}
      {loggedin && localStorage.getItem("MY_ROLE")=="Customer" && <Customer setLogged={setLoggedin}/>}
      {loggedin && localStorage.getItem("MY_ROLE")=="Seller" && <Seller setLogged={setLoggedin}/>}
      {loggedin && localStorage.getItem("MY_ROLE")=="Admin" && <Admin setLogged={setLoggedin} />}
    </>
  )
}

export default App

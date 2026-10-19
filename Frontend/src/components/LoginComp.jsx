import { useEffect, useState } from 'react';
import '../styles/login.css'
import axios from 'axios';
import API_BASE_URL from '../API';
import setLoading from '../LoadingController.js'

function LoginComp({ loginState, setLoginState, setLogged }) {

    const [error, setError] = useState(false);
    const [loginAs, setLoginAs] = useState('Customer');
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        role: loginAs
    })

    useEffect(() => {
        setLoginData({ ...loginData, role: loginAs });
    }, [loginAs]);

    var inputChange = (e) => {
        let tag = e.target;
        let tagName = tag.name;
        let tagValue = tag.value;
        setLoginData({ ...loginData, [tagName]: tagValue });
        // console.log(loginData);
    }

    const validateData = (e) => {
        e.preventDefault();
        setLoading(true);
        if (checkData()) {
            checkDatabase();
        } else {
            console.log("Login Failed")
        }
        
    }

    async function checkDatabase() {
        try {
            let response = await axios.post(`${API_BASE_URL}/login`, loginData);
            console.log(response);
            let userData = response.data;
            localStorage.setItem("MY_USERID", userData.userId);
            localStorage.setItem("MY_FULLNAME", userData.fullName);
            localStorage.setItem("MY_EMAIL", userData.email);
            localStorage.setItem("MY_PROFILEIMAGE", userData.profileImage);
            localStorage.setItem("MY_PHONE", userData.phone);
            localStorage.setItem("MY_ROLE", userData.role);
            localStorage.setItem("LOGGEDIN","true");
            console.log("Login Successfull");
            setLogged(true);
        } catch (error) {
            setError(true);
        }
        setLoading(false);

    }

    function checkData() {
        if (!loginData.email.endsWith('@gmail.com')) {
            setError(true);
            return false;
        } else if (loginData.password.length < 8) {
            setError(true);
            return false;
        } else {
            setError(false);
            return true;
        }
    }

    return (
        <>
            <div className="right">
                <form className='loginform' onSubmit={validateData}>
                    <h2>Welcome back !</h2>
                    <span>Log in to continue</span>
                    <p style={{ marginTop: '10px', marginBottom: '5px' }}><b>Log in as</b></p>
                    <div>
                        <div className={loginAs == 'Customer' ? 'active' : 'inactive'} onClick={() => setLoginAs("Customer")}>Customer</div>
                        <div className={loginAs == 'Seller' ? 'active' : 'inactive'} onClick={() => setLoginAs("Seller")}>Seller</div>
                        <div className={loginAs == 'Admin' ? 'active' : 'inactive'} onClick={() => setLoginAs("Admin")}>Admin</div>
                    </div>
                    <label htmlFor="email">Email or phone</label>
                    <input type="email" onChange={inputChange} name='email' id="email" placeholder="you@example.com" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputChange} name='password' id="password" placeholder="Password" required />
                    <span className='loginerror' style={error ? { display: 'block' } : { display: 'none' }}>Wrong email and password</span>
                    <span id='forgotpass'>Forgot password?</span>
                    <button type="submit" id='login'>Login</button>
                    <span>Don't have an account? <span style={{ color: '#7C3AED' }} onClick={() => { setLoginState(false) }}>Sign up</span></span>
                </form>

            </div>

        </>
    )

}

export default LoginComp;
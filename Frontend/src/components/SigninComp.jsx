
import { useEffect, useState } from 'react';
import '../styles/signin.css'
import API_BASE_URL, { CLOUDINARY_URL } from '../API';
import axios from 'axios'

import sampleImage from '../assets/sample_product_images/avatar.png'
import setLoading from '../LoadingController.js'

function SigninComp({ loginState, setLoginState, setLogged }) {

    const PRESET_NAME = "profile_image_preset";

    const [loginAs, setLoginAs] = useState('Customer');
    const [error, setError] = useState({ state: false, message: '' });

    const [newUserData, setNewUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        profileImage: '',
        role: loginAs,
        joinedDate:'',
        status:'Pending'
    });

    async function uploadImageToCloudinary() {

        const blob = await fetch(sampleImage).then((r) => r.blob());
        const file = new File([blob], "avatar.png", { type: blob.type });
        
        let formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", PRESET_NAME);
        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            console.log("clod data", response);
            let ImageUrl = response.data.secure_url;
            return ImageUrl;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    useEffect(() => {
        setNewUserData({ ...newUserData, role: loginAs });
    }, [loginAs]);

    var inputChangeHandle = (e) => {
        let tag = e.target;
        let tagName = tag.name;
        let tagValue = tag.value;
        setNewUserData({ ...newUserData, [tagName]: tagValue });
        // console.log(tagName,tagValue);
    }

    const validateData = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (checkData()) {
            await StoreDataInDatabase();
            console.log("Signin Success");
            
        } else {
            console.log("Signin Failed")
            setLoading(false);
        }

        
    }

    function getCurrentDate(){
        let date = new Date();
        console.log(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
        let currentDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      
        if(currentDate.length < 0){
            return false;
        }else{
            newUserData.joinedDate = currentDate;
            return true;
        }
    }

    function checkData() {
        let data = newUserData;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (data.phone.length != 10) {
            setError({ state: true, message: 'enter correct number' });
            return false;

        } else if (!data.email.endsWith('@gmail.com')) {
            setError({ state: true, message: 'correct email' });
            return false;

        }
        else if (data.password.length < 8) {
            setError({ state: true, message: 'password length must be 8 '});
            return false;

        }else if(!getCurrentDate()){
            return false;
        }
        else if(!strongPasswordRegex.test(data.password)){
            setError({ state: true, message: 'password must one upper case ,one number,and one special Symbol' });
            return false;
        }
        else {
            setError({ state: false, message: '' });
            return true;
        }
    }

    async function StoreDataInDatabase() {
        let ImageUrl = await uploadImageToCloudinary();
        if(ImageUrl){
             try {
            let response = await axios.post(`${API_BASE_URL}/signin`, { ...newUserData, profileImage: ImageUrl },{timeout:60000});
            // console.log(response);
          
                let userData = response.data;
                localStorage.setItem("MY_USERID", userData.userId);
                localStorage.setItem("MY_FULLNAME", userData.fullName);
                localStorage.setItem("MY_EMAIL", userData.email);
                localStorage.setItem("MY_PROFILEIMAGE", userData.profileImage);
                localStorage.setItem("MY_PHONE", userData.phone);
                localStorage.setItem("LOGGEDIN","true");
                localStorage.setItem("MY_JOINEDDATE",userData.joinedDate);
                localStorage.setItem("MY_STATUS",userData.status);
                localStorage.setItem("MY_ROLE", userData.role);
                setLogged(true);
            
        } catch (error) {
            setError({state:true,message:error.response.data});
            console.log(error.response);
            
        }
        }

        setLoading(false);
       


    }

    return (
        <>
            <div className="right">
                <form className='signinform' onSubmit={validateData}>
                    <h2>Create Your Account</h2>
                    <span>choose how you want to use GMall</span>
                    <p style={{ marginTop: '5px' }}><b>I want to</b></p>
                    <div>
                        <div className={loginAs == 'Customer' ? 'active' : 'inactive'} onClick={() => setLoginAs('Customer')}>Buy products</div>
                        <div className={loginAs == 'Seller' ? 'active' : 'inactive'} onClick={() => setLoginAs('Seller')}>Sell products</div>
                        <div className={loginAs == 'Admin' ? 'active' : 'inactive'} onClick={() => setLoginAs('Admin')}>Admin</div>
                    </div>
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" name='fullName' onChange={inputChangeHandle} id="fullname" placeholder="EX.Gopinath" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={inputChangeHandle} id="email" placeholder="gopi@example.com" required />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name='phone' onChange={inputChangeHandle} id="phone" placeholder="+91 1234567890" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={inputChangeHandle} id="password" placeholder="Password" required />
                    <span className='signinerror' style={error.state ? { display: 'block' } : { display: 'none' }}>{error.message}</span>
                    <span id='info'>Sellers also give a shop name and wait for admin approval admin accounts are created by the system</span>
                    <button type="submit" id='signin'>Sign up</button>
                    <span>Already have an account? <span style={{ color: '#7C3AED' }} onClick={() => { setLoginState(true) }}>Log in</span></span>
                </form>

            </div>

        </>
    )

}

export default SigninComp;
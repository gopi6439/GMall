import '../../styles/admin/manage_users.css'

import smartphone from '../../assets/login_page_images/smartphone.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'


function ManageUsers() {


    const [usersList, setUsersList] = useState([]);
    const [updateState, setUpdateState] = useState(false);


    useEffect(() => {
        setLoading(true);
        getAllUsers();
        
    }, [updateState]);

    async function getAllUsers() {
        try {
            let response = await axios.get(`${API_BASE_URL}/allUsers`);
            let data = await response.data;
            setUsersList(data);
        } catch (err) {
            if (err.response.status == 404) {
                console.log(err.response.data);
            }
        }
        setLoading(false);
    }


    // DELETE USER
    const rejectUser = async (e, user) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.delete(`${API_BASE_URL}/deleteUser/${user.userId}`);
            console.log(response);
            setUpdateState(!updateState);
        } catch (err) {
            console.log(err.response.data);
        }
        setLoading(false);
    }

    const checkAction = (e, user) => {
        e.preventDefault();
         setLoading(true);
        let value = e.target.textContent.trim();
        // console.log("value",value);
        if (value == 'Approve') {
            approveUser(user);
        }
    }

    // APPROVE USER
    async function approveUser(user) {
        try {
            let response = await axios.put(`${API_BASE_URL}/manageUsers/${user.userId}`);
            // console.log(response);
            setUpdateState(!updateState);
        } catch (err) {
            console.log(err.response.data);

        }
        setLoading(false);
    }


    return (
        <>
            <div className="manageuserscontent">

                <div className='allcontent'>

                    <div>
                        <div>Everyone</div>
                        <div>Customers</div>
                        <div>Sellers</div>
                        <div>Pending</div>
                    </div>

                    <div className="content5">

                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                            {usersList.length > 0 ? (usersList.map((user) => {
                                return (
                                    <>
                                        <tr className='p1'>
                                            <td className='ftd'><img src={user.profileImage} />{user.fullName}</td>
                                            <td>{user.role}</td>
                                            <td>{user.joinedDate}</td>

                                            <td><span className={user.status}>{user.status}</span></td>
                                            <td>
                                                <div className='action'>
                                                    <button onClick={(e) => checkAction(e, user)}>{user.role == 'Admin' ? 'Premision denied' : user.status == 'Active' ? 'View Profile' : 'Approve'} </button>
                                                    <button className={user.role != 'Admin' || 'reject'} onClick={(e) => rejectUser(e, user)}>Reject</button>
                                                </div>
                                            </td>
                                        </tr>{/* p1 */}
                                    </>
                                )
                            })
                            ) : (
                                <td colSpan={5} style={{ textAlign: 'center', padding: '20px 10px' }}>No Users Found</td>
                            )
                            }

                        </table>
                    </div>{/* content2 */}
                </div>

            </div>
        </>
    )
}

export default ManageUsers;
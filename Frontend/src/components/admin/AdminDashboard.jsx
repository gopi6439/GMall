
import { useEffect, useState } from 'react';
import '../../styles/admin/admin_dashboard.css'

function AdminDashboard({ setDashboardData ,totalCustomers,totalSellers,totalProducts,totalAwaitingApproval}) {

    const [sellersList,setSellersList] = useState([]);
    

    const deleteSeller = (e, seller) => {
        e.preventDefault();
        let updatedSellerList = sellersList.filter((data) => {
            if (data.sellerId != seller.sellerId) {
                return data;
            }
        });
        setSellersList(updatedSellerList);
         setDashboardData(
            {
                ...dashboardData, newSellersList: updatedSellerList
            }
        )
        // console.log("Temp",sellersList);
        // console.log("Rejected");
        // console.log("original",dashboardData.newSellersList);
    }

    const approveUser = (e, seller) => {
        let updatedSellerStatus = sellersList.map((data) => {
            if (data.sellerId == seller.sellerId) {
                data.status = 'active';
            }
            return data;
        });
        deleteSeller(e, seller);
        setDashboardData(
            {
                ...dashboardData, newSellersList: updatedSellerStatus
            }
        )
        // console.log("Approved");
        // console.log("Temp", sellersList);
        // console.log("original", dashboardData.newSellersList);
    }

    return (
        <>
            <div className="admindashboardcontent">
               

                <div className="categories">
                    <div>
                        <h2>{totalCustomers}</h2>
                        <span>Users</span>
                    </div>
                    <div>
                        <h2>{totalSellers}</h2>
                        <span>Sellers</span>
                    </div>
                    <div>
                        <h2>{totalProducts}</h2>
                        <span>products</span>
                    </div>
                    <div>
                        <h1>{totalAwaitingApproval}</h1>
                        <span>Awaiting approval</span>
                    </div>
                </div>

                <div className="analytics">

                    <div className="stockdeatails">
                        <h4>Sellers waiting for approval</h4>
                        <table>
                            <tr>
                                <th>Seller</th>
                                <th>Action</th>
                            </tr>

                            {sellersList.length > 0? sellersList.map((seller) => {
                                return (
                                    <tr>
                                        <td>{seller.fullName}</td>
                                        <td>
                                            <div>
                                                <button onClick={(e) => approveUser(e, seller)}>Approval</button>
                                                <button onClick={(e) => deleteSeller(e, seller)}>Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }): <td colSpan={2} style={{textAlign:"center"}}>No Data Found</td>
                            }

                        </table>
                    </div>
                    {/* stock deatails */}
                    <div className="salesweek">
                        <div>Mobile</div>
                        <div>Fashion</div>
                        <div>Foods</div>
                        <div>Books</div>
                        <div>Home Applience</div>
                        <div>Electronics</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminDashboard;
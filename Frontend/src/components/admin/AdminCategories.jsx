import '../../styles/admin/admin_categories.css'

import smartphone from '../../assets/login_page_images/smartphone.png'


function AdminCategories() {
    return (
        <>
            <div className="admincategorycontent">

                <div className="content7">
                    <div>
                        <input type="text" placeholder='Search my products' />
                        <button>+ Add Category</button>
                    </div>
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Products</th>
                            <th>Actions</th>
                        </tr>

                        <tr className='p1'>
                            <td>
                                <div>
                                    <img src={smartphone} alt="no" />
                                    <h3>Mobiles</h3>
                                </div>
                            </td>
                            <td>820</td>
                            <td>
                                <div className='action'>
                                    <button>Rename</button>
                                    <button>Delete</button>
                                </div>
                            </td>
                        </tr>{/* p1 */}

                        <tr className='p1'>
                            <td>
                                <div>
                                    <img src={smartphone} alt="no" />
                                    <h3>Fashion</h3>
                                </div>
                            </td>
                            <td>820</td>
                            <td>
                                <div className='action'>
                                    <button>Rename</button>
                                    <button>Delete</button>
                                </div>
                            </td>
                        </tr>{/* p1 */}

                        <tr className='p1'>
                            <td>
                                <div>
                                    <img src={smartphone} alt="no" />
                                    <h3>Toys</h3>
                                </div>
                            </td>
                            <td>820</td>
                            <td>
                                <div className='action'>
                                    <button>Rename</button>
                                    <button>Delete</button>
                                </div>
                            </td>
                        </tr>{/* p1 */}

                    </table>
                </div>{/* content2 */}

            </div>
        </>
    )
}

export default AdminCategories;
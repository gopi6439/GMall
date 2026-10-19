
import '../../styles/admin/admin_topnav.css'

function AdminTopNav({adminDetails,tabSelect,setShowProfileCard}){
    return(
        <>
             <div className="top">
                    <h2>{tabSelect}</h2>
                    <div onClick={()=>setShowProfileCard(true)}>
                        <i class="fa-solid fa-user" style={{ color: 'rgb(115, 51, 242)' }}></i>
                        <span>{adminDetails.fullName}</span>
                    </div>
                </div>{/* Top */}
        </>
    )
}

export default AdminTopNav;
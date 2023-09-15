import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

const UserAccess = () => {
    const Token = Cookies.get('jwt')
    return(
        Token ? <Outlet/> : <Navigate to ='/'/>
    )


}
export default UserAccess
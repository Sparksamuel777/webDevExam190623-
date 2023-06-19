
import {Link, useNavigate} from "react-router-dom";

import {useCookies} from 'react-cookie'

export const Navbar = () =>{
    const [cookies,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token","")  //clear token
        window.localStorage.removeItem("userID")
        window.localStorage.removeItem("token")
        navigate('/auth')
    }

    return(
        <div className={'navbar'}>
            <Link to={"/"}> Home </Link>
            {!cookies.access_token?(<Link to={"/auth"}> Login / Register </Link>) : <button onClick={logout}> Logout </button>}
            <Link to={"/create"}> Create  Recipe  </Link>
            <Link to={"/saved-recipes"}> Saved Recipes  </Link>
        </div>
    )
}
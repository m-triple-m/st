import { NavLink } from "react-router-dom";
import "./header.css";

const Header=()=>{
  return (
    <div>
      
      <header className="p-2 text-white color">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center ">
         <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink to="" className="nav-link px-2 text-white">Home</NavLink></li>
          {/* <li><NavLink to="" className="nav-link px-2 text-white">Features</NavLink></li> */}
          {/* <li><NavLink to="" className="nav-link px-2 text-white">Pricing</NavLink></li> */}
          {/* <li><NavLink to="" className="nav-link px-2 text-white">FAQs</NavLink></li> */}
          <li><NavLink to="" className="nav-link px-2 text-white">About</NavLink></li>
          <li className="nav-item">
            <NavLink to="/chat" activeClassName="active" className="nav-link px-2 text-white">
              Chat
            </NavLink>
          </li>
        </ul>
       <div className="text-end">
          <NavLink to="/login" ><button type="button" className="btn btn-outline-dark me-2">Login</button></NavLink>
          <NavLink to="/signup" ><button type="button" className="btn btn-dark">Sign-up</button></NavLink>
        </div>
      </div>
    </div>
  </header>
  
    </div>
  )
}
export default Header;

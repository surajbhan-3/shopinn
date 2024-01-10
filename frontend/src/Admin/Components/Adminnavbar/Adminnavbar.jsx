import React from "react";
import "./Adminnavbar.css"
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";


function AdminNavbar({ hideElements }) {



const avtar = localStorage.getItem("shopinn-user-profile-image")



  return (
    <div className="adminNavbar">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h2>
            {" "}
            <Link className="ldec" to="/admin">
              ShopInn
            </Link>
          </h2>
        </div>

        <div className="item-list">
          <div className="home">
            <Link id="hho" to="/overview">
              Overview
            </Link>
          </div>
          <div className="about">
            <Link id="abtt" to="/admin/add_products">
              Add Products
            </Link>
          </div>
          <div className="signup">
            {" "}
            <Link id="siin" to="/admin_users">
              Users
            </Link>
          </div>
        </div>
        <div className="wi-li">
          <div className="search">
            <input
              type="text"
              placeholder="what are you looking for ?"
              name=""
              id=""
            />
            <span className="search-dv">
              <IoSearchSharp />
            </span>
          </div>
          
            <>
            <Link to="/wishlist" id="wisl">
            <div id="whislist">
                <FaRegHeart />
              </div>
            </Link>
             
             <Link to="/cart" id="cct">
             <div id="cart-items-nav">
                <GrCart />
              </div>
             </Link>
              
                <>
                  <div className="user-profile-nav">
                    <div className="user-profile-image">
                      <img
                        src={avtar}
                        alt=""
                      />
                    </div>
                    
                  </div>
                </>
              
            </>
      
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;

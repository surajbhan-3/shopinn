import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
// import { wishlistProducts } from "../../Redux/ProductReducer/Action";


// ({ hideElements, isLoggedIn, handleIsLoggedOut })
function Navbar({ hideElements }) {
  const {isLoggedIn,handleIsLoggedOut} = useContext(AuthContext);
  const __wishlistProducts = useSelector((state) => {
    return state.ProductReducer.wishlistData;
  });
  const ___cartProducts = (useSelector((state)=>{
    return state.ProductReducer.cartData
}))

const avtar = localStorage.getItem("shopinn-user-profile-image")
// const dispatch = useDispatch()

// dispatch(wishlistProducts())



  return (
    <div className="navb">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h2>
            {" "}
            <Link className="ldec" to="/">
              ShopInn
            </Link>
          </h2>
        </div>

        <div className="item-list">
          <div className="home">
            <Link id="hho" to="/">
              Home
            </Link>
          </div>
          <div className="contact">Contact</div>
          <div className="about">
            <Link id="abtt" to="/about">
              About
            </Link>
          </div>
          <div className="signup">
            {" "}
            <Link id="siin" to="/signup">
              Sign Up
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
          {!hideElements && (
            <>
            <Link to="/wishlist" id="wisl">
            <div id="whislist">
                <FaRegHeart /> <sup>{__wishlistProducts.length}</sup>
              </div>
            </Link>
             
             <Link to="/cart" id="cct">
             <div id="cart-items-nav">
                <GrCart /> <sup>{___cartProducts.length}</sup>
              </div>
             </Link>
              {!isLoggedIn ? (
                <></>
              ) : (
                <>
                  <div className="user-profile-nav">
                    <div className="user-profile-image">
                      <img
                        src={avtar}
                        alt=""
                      />
                    </div>
                    <div className="profile-settings">
                      <div>
                        {" "}
                        <Link className="psts" id="sett" to="/settings">
                          <div>
                            <FiUser />{" "}
                          </div>{" "}
                          <div> Manage My Account </div>
                        </Link>
                      </div>
                      <div>
                        <Link className="psts" id="myod" to="/about">
                          <div>
                            <IoBagHandleOutline />{" "}
                          </div>{" "}
                          <div>My Order</div>
                        </Link>
                      </div>
                      <div>
                        <Link className="psts" id="cacc" to="/about">
                          <div>
                            <MdOutlineCancel />{" "}
                          </div>
                          <div> My Cancellations</div>
                        </Link>
                      </div>
                      <div>
                        <Link className="psts" id="revii" to="/reviews_given">
                          <div>
                          
                            <FaRegStar />
                          </div>
                          <div> My Reviews</div>
                        </Link>
                      </div>
                      <div>
                       
                        <Link className="psts" id="llog" to="/">
                          <div onClick={handleIsLoggedOut}>
                            <HiOutlineLogout /> 
                          </div>
                          <div  onClick={handleIsLoggedOut} >Logout</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

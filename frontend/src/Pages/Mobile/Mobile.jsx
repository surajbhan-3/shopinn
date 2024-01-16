import React from "react";
import MobileCard from "../../Component/MobileCard/MoblieCard";
import { useState, useEffect } from "react";
import apiService from "../../Config/apiService";
import "./Mobile.css";

function Mobile() {
  const [mobilesData, setMobilesData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [targetValue, setTargetValue] = useState("default");
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const colorSyle = {
    backgroundColor: "#ff4e5c",
  };

  useEffect(() => {
    const getMobilesProducts = async () => {
      try {
        const response = await apiService.get(
          `/products/category/electronics/page/1`
        );

        setMobilesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMobilesProducts();
  }, []);
  // console.log(electronicsData, "hey mobiles data")

  const handlePagination = async (pageNumber) => {
    try {
      const response = await apiService.get(
        `/products/category/electronics/page/${pageNumber}`
      );

      setMobilesData(response.data);
      setPageIndex(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectElectronics = async (subcategory) => {
    if (subcategory === "default") {
      try {
        const response = await apiService.get(
          `/products/category/electronics/page/1`
        );

        setMobilesData(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await apiService.get(
          `/products/category/electronics/subcategory/${subcategory}/page/1`
        );

        setMobilesData(response.data);

        setCheckboxStates({
          checkbox1: false,
          checkbox2: false,
          checkbox3: false,
        }); /// putting this at bottom because at top causing rendering problem
      } catch (error) {
        console.log(error);
      }
    }
    setTargetValue(subcategory);
  };

  const handlePrice = (key) => {
    if (key === "lth") {
      const data = [...mobilesData]; // Create a shallow copy of the array to avoid mutating the state directly
      // if your directly do like data = electronics.data.sort() then it will not re-render
      data.sort((a, b) => a.price - b.price);

      setMobilesData(data);
    } else if (key === "htl") {
      const data = [...mobilesData]; // Create a shallow copy of the array to avoid mutating the state directly
      // if your directly do like data = electronics.data.sort() then it will not re-render
      data.sort((a, b) => b.price - a.price);

      setMobilesData(data);
    } else if (key === "") {
      const data = [...mobilesData]; // Create a shallow copy of the array to avoid mutating the state directly
      // if your directly do like data = electronics.data.sort() then it will not re-render
      data.sort((a, b) => a.price - b.price);

      setMobilesData(data);
    }
  };

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxName]: !prevStates[checkboxName],
    }));
  };

  useEffect(() => {
    if (
      targetValue &&
      checkboxStates.checkbox1 &&
      !checkboxStates.checkbox2 &&
      !checkboxStates.checkbox3
    ) {
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=100&max=499`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      checkboxStates.checkbox1 &&
      checkboxStates.checkbox2 &&
      !checkboxStates.checkbox3
    ) {
      if (checkboxStates.checkbox1 && !checkboxStates.checkbox3) {
      } else if (checkboxStates.checkbox1 && checkboxStates.checkbox3) {
      }
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=100&max=999`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      checkboxStates.checkbox1 &&
      checkboxStates.checkbox2 &&
      checkboxStates.checkbox3
    ) {
      if (checkboxStates.checkbox1 && !checkboxStates.checkbox3) {
      } else if (checkboxStates.checkbox1 && checkboxStates.checkbox3) {
      }
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=100&max=1999`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      checkboxStates.checkbox1 &&
      !checkboxStates.checkbox2 &&
      checkboxStates.checkbox3
    ) {
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?middle=1`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      !checkboxStates.checkbox1 &&
      !checkboxStates.checkbox2 &&
      !checkboxStates.checkbox3
    ) {
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      !checkboxStates.checkbox1 &&
      checkboxStates.checkbox2 &&
      checkboxStates.checkbox3
    ) {
      if (checkboxStates.checkbox1 && !checkboxStates.checkbox3) {
      } else if (checkboxStates.checkbox1 && checkboxStates.checkbox3) {
      }
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=500&max=1999`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      !checkboxStates.checkbox1 &&
      !checkboxStates.checkbox2 &&
      checkboxStates.checkbox3
    ) {
      if (checkboxStates.checkbox1 && !checkboxStates.checkbox3) {
      } else if (checkboxStates.checkbox1 && checkboxStates.checkbox3) {
      }
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=1000&max=1999`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    } else if (
      targetValue &&
      !checkboxStates.checkbox1 &&
      checkboxStates.checkbox2 &&
      !checkboxStates.checkbox3
    ) {
      if (checkboxStates.checkbox1 && !checkboxStates.checkbox3) {
      } else if (checkboxStates.checkbox1 && checkboxStates.checkbox3) {
      }
      const getProductsByPriceRange = async () => {
        try {
          const response = await apiService.get(
            `/products/category/electronics/subcategory/${targetValue}/page/1?min=500&max=1000`
          );

          setMobilesData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByPriceRange();
    }

    if (targetValue == "default") {
      if (
        checkboxStates.checkbox1 &&
        !checkboxStates.checkbox2 &&
        !checkboxStates.checkbox3
      ) {
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=100&max=499`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        checkboxStates.checkbox1 &&
        checkboxStates.checkbox2 &&
        !checkboxStates.checkbox3
      ) {
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=100&max=999`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        checkboxStates.checkbox1 &&
        checkboxStates.checkbox2 &&
        checkboxStates.checkbox3
      ) {
       
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=100&max=1999`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        checkboxStates.checkbox1 &&
        !checkboxStates.checkbox2 &&
        checkboxStates.checkbox3
      ) {
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?middle=1`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        !checkboxStates.checkbox1 &&
        !checkboxStates.checkbox2 &&
        !checkboxStates.checkbox3
      ) {
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        !checkboxStates.checkbox1 &&
        checkboxStates.checkbox2 &&
        checkboxStates.checkbox3
      ) {
       
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=500&max=1999`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        !checkboxStates.checkbox1 &&
        !checkboxStates.checkbox2 &&
        checkboxStates.checkbox3
      ) {
       
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=1000&max=1999`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      } else if (
        !checkboxStates.checkbox1 &&
        checkboxStates.checkbox2 &&
        !checkboxStates.checkbox3
      ) {
       
        const getProductsByPriceRange = async () => {
          try {
            const response = await apiService.get(
              `/products/category/electronics/page/1?min=500&max=1000`
            );

            setMobilesData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getProductsByPriceRange();
      }
    }
  }, [checkboxStates]);

  return (
    <div className="main-mobiles">
      <div className="main-mobiles-wrapper">
        <div className="main-mobiles-left">
          <div className="main-mobiles-left-inner-wrapper">
            <select
              name=""
              onChange={(e) => {
                handleSelectElectronics(e.target.value);
              }}
              className="left-cct"
            >
              <option value="default">Category</option>
              <option value="airpodes">Airpodes</option>
              <option value="smartphone">Smartphones</option>
              <option value="watch">Watches</option>
            </select>{" "}
            <br />
            <select
              name=""
              onChange={(e) => {
                handlePrice(e.target.value);
              }}
              className="left-cct"
            >
              <option value="">Price</option>
              <option value="lth">Low To High</option>
              <option value="htl">High To Low</option>
            </select>
            <div className="cchbox">
              <span>Rs.100 - Rs.499 </span>

              <input
                type="checkbox"
                checked={checkboxStates.checkbox1}
                onChange={() => handleCheckboxChange("checkbox1")}
                name=""
                id=""
              />
            </div>
            <div className="cchbox">
              <span>Rs.500 - Rs.999 </span>
              <input
                type="checkbox"
                checked={checkboxStates.checkbox2}
                onChange={() => handleCheckboxChange("checkbox2")}
                name=""
                id=""
              />
            </div>
            <div className="cchbox">
              <span>Rs.1000 - Rs.1999 </span>
              <input
                type="checkbox"
                checked={checkboxStates.checkbox3}
                onChange={() => handleCheckboxChange("checkbox3")}
                name=""
                id=""
              />
            </div>
          </div>
        </div>
        <div className="main-mobiles-right">
          <div className="mobiles-container">
            {mobilesData ? (
              mobilesData.map((el) => (
                <MobileCard
                  key={el._id}
                  productId={el._id}
                  name={el.name}
                  price={el.price}
                  imageUrl={el.imageUrl}
                  rating ={el.rating}
                />
              ))
            ) : (
              <div>No user Exist</div>
            )}
          </div>

          <div className="pagination-div">
            <div>
              {pageIndex === 1 ? (
                <button
                  style={colorSyle}
                  onClick={() => {
                    handlePagination(1);
                  }}
                >
                  Page 1
                </button>
              ) : (
                <button
                  onClick={() => {
                    handlePagination(1);
                  }}
                >
                  Page 1
                </button>
              )}
            </div>
            <div>
              {" "}
              {pageIndex === 2 ? (
                <button
                  style={colorSyle}
                  onClick={() => {
                    handlePagination(2);
                  }}
                >
                  Page 2
                </button>
              ) : (
                <button
                  onClick={() => {
                    handlePagination(2);
                  }}
                >
                  Page 2
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;

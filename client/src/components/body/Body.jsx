import { useState, useEffect } from "react";
import RestaurantCard from "../restaurantCard/RestaurantCard";
import Shimmer from "../shimmer/Shimmer";
import "./Body.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const [filteredRes, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const LOCAL_API_URL = "https://quickbite-4ojx.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(LOCAL_API_URL);
      const json = await res.json();

      // ✅ Extract restaurant list from nested Swiggy structure
      const cards = json?.data?.cards;

      const restaurantCards =
        cards
          ?.filter(
            (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
          )
          ?.flatMap(
            (card) => card.card.card.gridElements.infoWithStyle.restaurants
          ) || [];

      setrestaurantList(restaurantCards);
      setFilteredList(restaurantCards);
    } catch (error) {
      console.error("Failed in fetching API!", error);
    }
  };

  // ⭐ Filter restaurants with rating > 4
  const filteredListHandler = () => {
    const newFilteredList = restaurantList.filter(
      (res) => parseFloat(res.info.avgRating) > 4
    );
    setFilteredList(newFilteredList);
    toast("Showing Filtered Restaurants!");
  };

  // 🔍 Search restaurant by name
  const searchHandler = () => {
    const filteredBySearchRes = restaurantList.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filteredBySearchRes);
    toast("Showing searched results!");
  };

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body-container">
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={filteredListHandler}
        >
          Filter
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={searchHandler}>Search</button>
        </div>
      </div>

      <div className="res-container">
        {filteredRes.map((res, idx) => (
          <Link
            to={`/restaurant/${res.info.id}`}
            key={`${res.info.id}-${idx}`} // ✅ Ensures uniqueness
          >
            <RestaurantCard restaurantList={res.info} />
          </Link>
        ))}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Body;

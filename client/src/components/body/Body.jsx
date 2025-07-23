import { useState, useEffect } from "react";
import RestaurantCard from "../restaurantCard/RestaurantCard";
import Shimmer from "../shimmer/Shimmer";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BUTTON_CLASSES } from "../../utils/constant";
import OfflinePage from "../status/OfflinePage";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Body = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const [filteredRes, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const LOCAL_API_URL = "https://quickbite-4ojx.onrender.com/restaurants";

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
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    //here you can show game or something to engage user even in offline conditions
    return <OfflineIndicator />;

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body m-2">
      <div className="m-2 flex items-center justify-evenly">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Restaurants"
            value={searchText}
            className="border-2 mr-2 p-2 round-lg hover:bg-gray-50 w-64"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className={BUTTON_CLASSES}
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
        <button
          className={BUTTON_CLASSES}
          onClick={filteredListHandler}
        >
          Top Rated Restaurants ✅
        </button>
      </div>

      <div className="res-container grid grid-cols-5 p-4 ml-14">
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

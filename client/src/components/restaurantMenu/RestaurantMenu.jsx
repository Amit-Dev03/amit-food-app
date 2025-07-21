import { useEffect, useState } from "react";
import Shimmer from "../shimmer/Shimmer";
import green from "../../assets/green.png";
import red from "../../assets/red.png";
import { useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiEBike2Fill } from "react-icons/ri";
import "./RestaurantMenu.css";
import { SWIGGY_MENU_FOOD_IMAGE_URL } from "../../utils/constant";

const LOCAL_MENU_URL = "http://localhost:4000/restaurant/";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  //adding Accordion functionality
  const [openSection, setOpenSection] = useState([]);
  const fetchMenu = async () => {
    try {
      const res = await fetch(LOCAL_MENU_URL + resId);
      const json = await res.json();
      setResInfo(json.data);
    } catch {
      console.log("Failed to fetch menu!");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]);
  //toggle functionality for Accordion
  const toggleSection = (index) => {
    //if element is already in array it means toggle is open hence close it
    if (openSection.includes(index)) {
      setOpenSection(openSection.filter((i) => i !== index));
    } else {
      setOpenSection([...openSection, index]);
    }
  };
  //Shimmer condition
  if (resInfo === null) return <Shimmer />;
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info;
  const typeCard =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const { minDeliveryTime, maxDeliveryTime } = sla ?? "--";
  return (
    <div className="restaurant-details">
      {/* restaurant details */}
      <div className="res-text">
        <h2>{name}</h2>
        <h3>
          ⭐{avgRating} ({totalRatingsString}) • {costForTwoMessage}
        </h3>
        <h4>{cuisines.join(", ")}</h4>
        <p>
          <RiEBike2Fill />
          {" " + minDeliveryTime}-{maxDeliveryTime} mins
        </p>
        <span></span>
      </div>

      {/*********menu-details**********/}
      {typeCard.map((type, index) => (
        <div
          key={type.card.card.title}
          className="menu-container"
        >
          <button onClick={() => toggleSection(index)}>
            <p className="text">{type.card.card.title}</p>
            <p className="sign">
              {openSection.includes(index) ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowUp />
              )}
            </p>
          </button>
          {openSection.includes(index) &&
            type.card.card.itemCards.map((card) => (
              <div
                className="menu"
                key={card.card.info.id}
              >
                <div className="menu-text">
                  {card.card.info.isVeg === 1 ? (
                    <img
                      src={green}
                      alt="veg"
                    />
                  ) : (
                    <img
                      src={red}
                      alt="non-veg"
                    />
                  )}
                  <h4>{card.card.info.name}</h4>
                  <h4>₹{(card.card.info.price || 0) / 100}</h4>
                  <p>{card.card.info.description}</p>
                </div>
                <img
                  src={SWIGGY_MENU_FOOD_IMAGE_URL + card.card.info.imageId}
                  alt="Food menu pic"
                  className="food"
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
export default RestaurantMenu;

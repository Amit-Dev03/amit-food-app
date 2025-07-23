import { useState } from "react";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import Shimmer from "../shimmer/Shimmer";
import green from "../../assets/green.png";
import red from "../../assets/red.png";
import { useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiEBike2Fill } from "react-icons/ri";
import { SWIGGY_MENU_FOOD_IMAGE_URL } from "../../utils/constant";
import { BUTTON_CLASSES } from "../../utils/constant";

// For deployment, change the URL accordingly

const RestaurantMenu = () => {
  //adding Accordion functionality
  const [openSection, setOpenSection] = useState([]);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

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
    <div className="menu flex items-center justify-center flex-col gap-2">
      {/* restaurant details */}

      <h1 className="font-bold text-2xl">{name}</h1>
      <h3>
        ⭐{avgRating} ({totalRatingsString})
      </h3>
      <h4>
        😋{cuisines.join(", ")} • {costForTwoMessage}
      </h4>
      <p>
        <RiEBike2Fill />
        {" " + minDeliveryTime}-{maxDeliveryTime} mins
      </p>

      {/*********menu-details**********/}
      <h2 className="font-semibold flex gap-1">
        <IoFastFoodOutline /> Menu
      </h2>
      {typeCard.map((type, index) => (
        <div
          key={type.card.card.title}
          className="w-[500px] mr-[3rem]"
        >
          <button
            className=" w-[700px] flex item-center justify-between p-3 rounded-lg bg-blue-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500 transition duration-400 ease-in-out"
            onClick={() => toggleSection(index)}
          >
            {type.card.card.title}
            <span className="ml-5">
              {openSection.includes(index) ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowUp />
              )}
            </span>
          </button>
          {openSection.includes(index) &&
            type.card.card.itemCards.map((card) => (
              <div
                className="menu "
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
                  loading="lazy"
                  className="w-32 rounded-xl mb-2"
                />

                <span className="block w-[700px] h-px bg-gray-300"></span>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
export default RestaurantMenu;

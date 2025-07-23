import { CLOUDINARY_IMAGE_URL } from "../../utils/constant";
import { PiPersonSimpleBikeBold } from "react-icons/pi";

const RestaurantCard = ({ restaurantList }) => {
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, sla } =
    restaurantList;
  const deliveryTime = sla.deliveryTime ?? "--";
  return (
    <div className="res-card hover:shadow-md text-center h-96 mt-4 mb-5 w-72 flex flex-col items-center hover:rounded-md hover:-translate-y-1 hover:scale-105 hover:border transition duration-700 ease-in-out">
      <img
        src={CLOUDINARY_IMAGE_URL + cloudinaryImageId}
        alt="Food image"
        className="w-3/4 p-2 rounded-2xl"
      />
      <h3 className="font-bold py-3">{name}</h3>
      <h4 className="costForTwo">{costForTwo}</h4>
      <h4 className="wrap-break-word text-sm">{cuisines.join(",")}</h4>
      <h4 className="avgRating">⭐{avgRating}</h4>
      <p className="flex items-center gap-2">
        <PiPersonSimpleBikeBold /> {deliveryTime} mins
      </p>
    </div>
  );
};
export default RestaurantCard;

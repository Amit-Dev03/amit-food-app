import "./RestaurantCard.css";
import { CLOUDINARY_IMAGE_URL } from "../../utils/constant";
const RestaurantCard = ({ restaurantList }) => {
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, sla } =
    restaurantList;
  const deliveryTime = sla.deliveryTime ?? "--";
  return (
    <div className="res-card">
      <img
        src={CLOUDINARY_IMAGE_URL + cloudinaryImageId}
        alt="Food image"
      />
      <h3 className="name">{name}</h3>
      <h4 className="costForTwo">{costForTwo}</h4>
      <h4 className="cuisines">{cuisines.join(",")}</h4>
      <h4 className="avgRating">⭐{avgRating}</h4>
      <p className="deliveryTime">{deliveryTime} mins</p>
    </div>
  );
};
export default RestaurantCard;

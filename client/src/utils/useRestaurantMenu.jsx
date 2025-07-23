import { useEffect, useState } from "react";
const LOCAL_MENU_URL = "https://quickbite-4ojx.onrender.com/restaurant/";
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  //declare fetching method that is being called from useEffect, exactly above the useEffect() hook declaration
  useEffect(() => {
    if (!resId) return;
    //function declaration with try-catch
    const fetchMenu = async () => {
      try {
        {
          console.log("resid: ", resId);
        }
        const res = await fetch(LOCAL_MENU_URL + resId);
        if (!res.ok) {
          throw new Error(`HTTP Error : status code ${res.status}`);
        }
        const json = await res.json();
        {
          console.log("json", json);
        }
        setResInfo(json.data);
        console.log("Updated resInfo", resInfo);
      } catch (err) {
        console.error("Error in fetching data: ", err);
      }
    };
    //function call
    fetchMenu();
  }, [resId]);

  return resInfo;
};
export default useRestaurantMenu;

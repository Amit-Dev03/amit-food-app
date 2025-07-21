import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import About from "../about/About";
import Contact from "../contact/Contact";
import Error from "../error/Error";
import Body from "../body/Body";
import Cart from "../cart/Cart";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, //index: true: Makes this the default route when visiting /
        element: <Body />, // Shows the <Body /> component when users visit the root URL
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

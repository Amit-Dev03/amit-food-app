import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Oops! 😐</h1>
      <h2>Something wrong happened!</h2>
      {console.log(err)}
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
};
export default Error;

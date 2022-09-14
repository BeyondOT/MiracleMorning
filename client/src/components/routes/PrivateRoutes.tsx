import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getToken, selectAuth } from "../../features/authentication/authSlice";
import Navbar from "../navbar/Navbar";


const PrivateRoutes = () => {
  const { token } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToken()).then(() => (setLoading(false)))
  }, [dispatch])
  
  if(loading){
    return <div>loading</div>
  }
  return !token ? (
    <Navigate to="/auth" />
  ) : (
    <>
    <Navbar />
    <Outlet />
    </>
    );
};
export default PrivateRoutes;

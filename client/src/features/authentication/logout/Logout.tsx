import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Logout
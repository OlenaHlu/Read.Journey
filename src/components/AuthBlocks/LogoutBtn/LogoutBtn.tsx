import css from "./LogoutBtn.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { signOut } from "../../../redux/auth/operations";
import { selectToken } from "../../../redux/auth/selectors";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectToken);

  const handleLogout = () => {
    console.log("logout");
    dispatch(signOut());
    navigate("/");
  };

  return (
    isAuth != null && (
      <button onClick={handleLogout} className={css.logoutBtn} type="submit">
        Log out
      </button>
    )
  );
};

export default LogoutBtn;

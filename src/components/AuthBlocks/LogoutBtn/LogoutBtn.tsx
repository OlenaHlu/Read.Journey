import css from "./LogoutBtn.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { signOut } from "../../../redux/auth/operations";
import { selectToken } from "../../../redux/auth/selectors";
import { resetAuth } from "../../../redux/auth/slice";

const LogoutBtn = ({ isModal }: { isModal?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  const handleLogout = () => {
    console.log("Simulating logout (local очищення)");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    dispatch(resetAuth());
    navigate("/");
  };

  return (
    localStorage.getItem("token") && (
      <button
        onClick={handleLogout}
        className={`${css.logoutBtn} ${isModal ? css.modal : ""}`}
        type="submit"
      >
        Log out
      </button>
    )
  );
};

export default LogoutBtn;

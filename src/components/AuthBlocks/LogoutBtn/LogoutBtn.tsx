import css from "./LogoutBtn.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { signOut } from "../../../redux/auth/operations";
import { selectToken } from "../../../redux/auth/selectors";

const LogoutBtn = ({ isModal }: { isModal?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  const handleLogout = () => {
    console.log("logout");
    dispatch(signOut());
    navigate("/");
  };

  return (
    token && (
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

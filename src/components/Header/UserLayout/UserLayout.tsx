import css from "./UserLayout.module.css";

import LogoutBtn from "../../AuthBlocks/LogoutBtn/LogoutBtn";
import { useAppSelector } from "../../../redux/hook";
import { selectToken, selectUser } from "../../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

const UserLayout = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={css.userContainer}>
      {token ? (
        <div className={css.userBlock}>
          <div className={css.name}>
            <span className={css.nameInitial}>
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </span>
            <p className={css.fullName}>{user?.name ?? "User"}</p>
          </div>
          <LogoutBtn />
        </div>
      ) : (
        <div className={css.authBtn}>
          <button onClick={handleLogin} className={css.loginBtn}>
            Log in
          </button>
          <button onClick={handleRegister} className={css.registerBtn}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLayout;

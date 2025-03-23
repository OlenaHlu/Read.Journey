import css from "./UserLayout.module.css";

const UserLayout = () => {
  return (
    <div className={css.userContainer}>
      <div className={css.name}>
        <span className={css.nameInitial}>U</span>
        <p className={css.fullName}>User</p>
      </div>
      <button className={css.logoutBtn} type="submit">
        Log out
      </button>
    </div>
  );
};

export default UserLayout;

import css from "./LoginForm.module.css";

import logo from "../../../assets/logo.svg";

const LoginForm = () => {
  return (
    <section className={css.loginContainer}>
      <img src={logo} className={css.logo} />
      <h2>
        Expand your mind, reading <span>a book</span>
      </h2>
      <div></div>
    </section>
  );
};

export default LoginForm;

import css from "./LogRegForm.module.css";

import logo from "../../assets/logo.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validation";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginFormValues) => {
    console.log("form is valid:", data);
  };
  return (
    <section className={css.logRegContainer}>
      <img src={logo} className={css.logo} />
      <h2 className={css.title}>
        Expand your mind, reading <span className={css.span}>a book</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputsBlock}>
          <input
            className={css.input}
            {...register("email")}
            placeholder="Mail:"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            className={css.input}
            {...register("password")}
            placeholder="Password:"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className={`${css.submitBlock} ${css.logAdd}`}>
          <button className={css.formBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "loading..." : "Log in"}
          </button>
          <Link className={css.navigation} to="/register">
            Don’t have an account?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

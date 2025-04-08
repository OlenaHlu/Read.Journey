import css from "./LogRegForm.module.css";

import logo from "../../assets/logo.svg";
import Icon from "../common/Icon";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validation";
import { signIn } from "../../redux/auth/operations";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(signIn(data));
    navigate("/recommended");
  };

  const togglePwd = () => {
    setIsVisiblePwd(!isVisiblePwd);
  };

  return (
    <section className={css.logRegContainer}>
      <div className={css.logoContainer}>
        <Link to="/">
          <img src={logo} className={css.logo} />
        </Link>
        <p className={css.logoName}>read journey</p>
      </div>
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
          <div className={css.inputPwd}>
            <input
              className={css.input}
              {...register("password")}
              type={isVisiblePwd ? "text" : "password"}
              placeholder="Password:"
            />
            <button type="button" onClick={togglePwd}>
              {isVisiblePwd ? (
                <Icon className={css.iconPwd} iconName="eye" />
              ) : (
                <Icon className={css.iconPwd} iconName="eye-off" />
              )}
            </button>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
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

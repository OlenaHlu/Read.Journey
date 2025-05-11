import css from "./LogRegForm.module.css";

import logo from "../../assets/logo.svg";
import Icon from "../common/Icon";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validation";
import { signIn, fetchCurrentUser } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  // const onSubmit = (data: LoginFormValues) => {
  //   console.log("form is valid:", data);
  //   dispatch(signIn(data));
  //   navigate("/recommended");
  // };

  const onSubmit = async (data: LoginFormValues) => {
    console.log("form is valid:", data);
    try {
      const resultAction = await dispatch(signIn(data));
      if (signIn.fulfilled.match(resultAction)) {
        await dispatch(fetchCurrentUser());
        navigate("/recommended");
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const togglePwd = () => {
    setIsVisiblePwd(!isVisiblePwd);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

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

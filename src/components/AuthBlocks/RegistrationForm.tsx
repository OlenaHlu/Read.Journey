import css from "./LogRegForm.module.css";

import logo from "../../assets/logo.svg";
import Icon from "../common/Icon";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerSchema } from "../../utils/validation";
import { selectError, selectIsLoading } from "../../redux/auth/selectors";
import { signUp } from "../../redux/auth/operations";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const initialValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("form is valid:", data);
    dispatch(signUp(data));
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
          <div>
            <input
              className={css.input}
              {...register("name")}
              placeholder="Name:"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <input
              className={css.input}
              {...register("email")}
              placeholder="Mail:"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
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
        <div className={css.submitBlock}>
          <button className={css.formBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting || isLoading ? "loading..." : "Registration"}
          </button>
          <Link className={css.navigation} to="/login">
            Already have an account?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegistrationForm;

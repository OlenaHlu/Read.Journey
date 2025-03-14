import css from "./LoginForm.module.css";

import logo from "../../../assets/logo.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validation";

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
    <section className={css.loginContainer}>
      <img src={logo} className={css.logo} />
      <h2>
        Expand your mind, reading <span>a book</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Name:" />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} placeholder="Mail:" />
        {errors.password && <p>{errors.password.message}</p>}
      </form>
    </section>
  );
};

export default LoginForm;

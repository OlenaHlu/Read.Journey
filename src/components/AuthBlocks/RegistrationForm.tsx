import css from "./LogRegForm.module.css";

import logo from "../../assets/logo.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerSchema } from "../../utils/validation";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
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
            {...register("name")}
            placeholder="Name:"
          />
          {errors.email && <p>{errors.email.message}</p>}
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
        <div className={css.submitBlock}>
          <button className={css.formBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "loading..." : "Registration"}
          </button>
          <Link className={css.navigation} to="/register">
            Already have an account?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegistrationForm;

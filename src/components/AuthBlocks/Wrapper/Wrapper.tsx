import css from "./Wrapper.module.css";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className={css.wrapperContainer}>
      <div>{children}</div>
      <div className={css.bannerContainer}>
        <div className={css.background}></div>
      </div>
    </div>
  );
};

export default Wrapper;

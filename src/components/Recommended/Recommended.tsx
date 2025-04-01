import css from "./Recommended.module.css";

import Icon from "../common/Icon";

const Recommended = () => {
  return (
    <div className={css.recomContainer}>
      <div className={css.topPart}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.paginationBlock}>
          <button type="button" className={css.btn}>
            <Icon className={css.iconLeft} iconName="chevron" />
          </button>
          <button type="button" className={css.btn}>
            <Icon className={css.iconRight} iconName="chevron" />
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Recommended;

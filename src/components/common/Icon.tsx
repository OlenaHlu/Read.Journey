import symbols from "../../assets/symbol-defs.svg";

type IconProps = {
  iconName: string;
  className: string;
  color?: string;
};

const Icon = ({ iconName, className, color }: IconProps) => {
  return (
    <svg
      className={className}
      style={color ? ({ "--color1": color } as React.CSSProperties) : {}}
    >
      <use href={`${symbols}#icon-${iconName}`} />
    </svg>
  );
};
export default Icon;

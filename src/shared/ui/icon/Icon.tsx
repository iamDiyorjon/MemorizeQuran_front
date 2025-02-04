import { MaterialIcon } from "material-icons";
import { FC } from "react";

interface IconProps {
  name: MaterialIcon;
  size?: number;
  color?: string;
}

export const Icon: FC<IconProps> = ({ name, size, color }) => {
  return (
    <span
      style={{
        fontSize: size || 32,
        color: color || "currentColor",
      }}
      className="material-icons-round"
    >
      {name}
    </span>
  );
};

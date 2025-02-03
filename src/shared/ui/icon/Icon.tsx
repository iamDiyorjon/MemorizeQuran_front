import { MaterialIcon } from "material-icons";
import { FC } from "react";

interface IconProps {
  name: MaterialIcon;
  size?: number;
}

export const Icon: FC<IconProps> = ({ name, size }) => {
  return (
    <span
      style={{
        fontSize: size || 32,
      }}
      className="material-icons-round"
    >
      {name}
    </span>
  );
};

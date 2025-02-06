import React from "react";

interface StarBadgeProps {
  color?: string;
  size?: number;
  number?: number;
}

const StarBadge: React.FC<StarBadgeProps> = ({
  color = "#2F7E83",
  size = 100,
  number = 1,
}) => {
  // Adjust font size based on the number of digits
  const numLength = number.toString().length;
  const fontSize = size / (numLength === 1 ? 2 : numLength === 2 ? 3 : 3.5);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Star Shape */}
      <path
        d="M31.078 12.622V5.977c0-.583-.472-1.055-1.055-1.055h-6.645L18.744.307a1.055 1.055 0 0 0-1.488 0l-4.634 4.615H5.977c-.583 0-1.055.472-1.055 1.055v6.645L.307 17.256a1.055 1.055 0 0 0 0 1.488l4.615 4.634v6.645c0 .583.472 1.055 1.055 1.055h6.645l4.634 4.615a1.05 1.05 0 0 0 1.488 0l4.634-4.615h6.645c.583 0 1.055-.472 1.055-1.055v-6.645l4.615-4.634c.41-.411.41-1.077 0-1.488zm-1.802 9.576a1.06 1.06 0 0 0-.307.744v6.027h-6.027c-.278 0-.546.11-.744.307L18 33.456l-4.198-4.18a1.06 1.06 0 0 0-.745-.307H7.031v-6.027c0-.278-.11-.546-.307-.744L2.544 18l4.18-4.198c.197-.198.307-.466.307-.745V7.031h6.026c.28 0 .547-.11.745-.307L18 2.544l4.198 4.18c.198.197.466.307.744.307h6.027v6.026c0 .28.11.547.307.745L33.456 18z"
        fill={color}
      />
      {/* Number in the center */}
      <text
        x="48%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fill={color}
        fontWeight="bold"
      >
        {number}
      </text>
    </svg>
  );
};

export default StarBadge;

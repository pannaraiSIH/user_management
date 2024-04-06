import React from "react";

const Button = ({
  children,
  style,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  style: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      className={`${style} text-white w-fit px-6 py-2 text-nowrap rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

const Input = ({
  children,
  value,
  id,
  placeholder,
  type = "text",
  style,
  onChange,
}: {
  children: React.ReactNode;
  value: string;
  id: string;
  placeholder: string;
  type?: "text" | "file" | "date";
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label htmlFor={id} className='flex flex-col'>
      {children}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        id={id}
        className={`${style} px-2 py-2 border rounded-md`}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;

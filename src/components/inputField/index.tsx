import { FC, forwardRef } from "react";
import { InputFieldType } from "./types";

export const classes = `block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

const InputField: FC<InputFieldType> = forwardRef(
  (
    { type, placeholder, customeClass, symbol, callBack, ...props },
    ref: any
  ) => {
    return (
      <div className="w-full relative">
        <span
          onClick={() => callBack && callBack()}
          className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2"
        >
          {symbol}
        </span>
        <input
          ref={ref}
          id={placeholder}
          type={type}
          className={classes + " " + customeClass}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

export default InputField;

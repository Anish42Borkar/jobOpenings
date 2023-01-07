import { FC, RefObject, useEffect, useRef, useState } from "react";
import InputField from "../inputField";

// import Loading from "../loading";

export type DropdownSearchBoxDataType = {
  id: string | number;
  title: string;
};

type DropdownSearchBoxProps = {
  selectors?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  onClick?: (
    e: DropdownSearchBoxDataType,
    ref: RefObject<HTMLInputElement>
  ) => void;
  isLoading?: boolean;
  symbol?: JSX.Element;
  data: Array<DropdownSearchBoxDataType>;
};

const DropdownSearchBox: FC<DropdownSearchBoxProps> = ({
  selectors,
  placeholder,
  onChange,
  onClick,
  isLoading,
  data,
  symbol,
}) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef(null as any);

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    document.querySelector(selectors!)?.addEventListener("click", (e) => {
      if (document.activeElement === searchBoxRef.current) {
        console.log("element has focus");
      } else {
        console.log("element does NOT have focus");
        onBlur();
      }
    });
  }, []);

  return (
    <div className="relative w-full">
      <div className=" ">
        <InputField
          autoComplete="off"
          ref={searchBoxRef}
          placeholder={placeholder}
          customeClass=" "
          onChange={(e: any) => onChange!(e)}
          onFocus={onFocus}
          symbol={symbol}
        />

        <div
          className={`absolute w-full z-50  ${
            !focused && "hidden "
          } top-16  right-0 md:right-auto shadow-xl   rounded bg-white  `}
        >
          {/* <p className=" w-full bg-slate-600/20 rounded-b text-center absolute top-0 z-10">
            {isLoading && <Loading />}
          </p> */}
          <div
            className="relative min-h-0  max-h-[10rem] overflow-hidden overflow-y-scroll  scrollbar-hide "
            ref={dropdownRef}
          >
            {searchBoxRef.current?.value !== "" && (
              <p className="">
                {!isLoading && data.length === 0 && "NO RECORD FOUND"}
              </p>
            )}
            {data.map((val, key) => (
              <div
                key={key}
                className="py-2 px-4 cursor-pointer border-b-1 hover:bg-slate-100 active:bg-slate-200"
                onClick={(e) => {
                  e.stopPropagation();
                  searchBoxRef.current!.value = val.title;
                  onClick!(val, searchBoxRef);
                  onBlur();
                }}
              >
                <p className="text-sm">{val.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DropdownSearchBox.defaultProps = {
  selectors: "html",
  isLoading: false,
  placeholder: "Search",
  onChange: (e) => {},
  onClick: (e) => {},
};

export default DropdownSearchBox;

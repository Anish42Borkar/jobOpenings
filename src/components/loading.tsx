import { FC } from "react";

interface LoadingProps {
  w?: string;
  h?: string;
}

const Loading: FC<LoadingProps> = ({ w, h }): JSX.Element => {
  return (
    <span
      className={`spinner-border animate-spin inline-block w-${w} h-${h} border-4 border-r-link rounded-full`}
    ></span>
  );
};

Loading.defaultProps = {
  w: "8",
  h: "8",
};

export default Loading;

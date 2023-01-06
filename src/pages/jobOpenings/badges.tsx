import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type BadgesProps = {
  title: string;
  callBack: () => void;
};
const Badges: FC<BadgesProps> = ({ title, callBack }) => {
  return (
    <div className="flex gap-4 py-2 px-2 bg-badge items-center m-1">
      <p className="text-sm">{title}</p>
      <XMarkIcon
        className=" w-4 h-4 cursor-pointer bg-White"
        onClick={() => callBack()}
      />
    </div>
  );
};

export default Badges;

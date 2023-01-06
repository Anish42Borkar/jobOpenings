import { BuildingOfficeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApiResquestHandler from "../../hooks/useApiRequestHandler";
import { ResponseData } from "../jobOpenings/types";

const JobDetails = () => {
  const params = useParams();
  const { id } = params;
  const { request, requstedData } = useApiResquestHandler();
  const responseData = requstedData as unknown as ResponseData;
  async function getDetails() {
    await request({
      path: `api/v1/jobs/${id}`,
    });
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="py-7 px-9">
      <p className="font-bold">
        Development Department At {responseData?.company}
      </p>
      <div className="">
        <p className="font-bold text-xl mb-2">{responseData?.title}</p>
        <div className="flex gap-5">
          <div className="flex items-center">
            <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
            <p className="text-sm">{responseData?.department?.title}</p>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 text-gray-400" />
            <p className="text-sm ">{responseData?.location?.title}</p>
          </div>
          <p className="text-sm bg-grayShade py-0.5 px-5 ">
            {responseData?.type || "N/A"}
          </p>
        </div>
      </div>

      <div className="my-10">
        <button className="bg-link hover:bg-blue-500 text-white font-semibold text-sm py-2 px-10 rounded-full">
          Apply
        </button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: responseData?.description }} />
    </div>
  );
};

export default JobDetails;

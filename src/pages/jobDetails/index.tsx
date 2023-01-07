import { BuildingOfficeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useApiResquestHandler from "../../hooks/useApiRequestHandler";
import { ResponseData } from "../jobOpenings/types";
import facebookIcon from "../../assets/icons/facebook.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import twitterIcon from "../../assets/icons/twitter.svg";

const JobDetails = () => {
  const params = useParams();
  const location = useLocation();
  const { jobOpenings } = location.state;
  const { id } = params;
  const { request, requstedData } = useApiResquestHandler<ResponseData>();

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
        Development Department At {requstedData?.company}
      </p>
      <div className="">
        <p className="font-bold text-xl mb-2">{requstedData?.title}</p>
        <div className="flex gap-5 flex-wrap">
          <div className="flex items-center">
            <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
            <p className="text-sm">{requstedData?.department?.title}</p>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 text-gray-400" />
            <p className="text-sm ">{requstedData?.location?.title}</p>
          </div>
          <p className="text-sm bg-grayShade py-0.5 px-5 ">
            {requstedData?.type || "N/A"}
          </p>
        </div>
      </div>

      <div className="my-10">
        <a
          href={requstedData.applyUrl}
          target="_blank"
          className="bg-link hover:bg-blue-500 text-white font-semibold text-sm py-2 px-10 rounded-full"
        >
          Apply
        </a>
      </div>
      <hr />
      <div className="grid grid-cols-1 lg:grid-cols-4 md: gap-3 mt-8">
        <div
          className="col-span-3"
          dangerouslySetInnerHTML={{ __html: requstedData?.description }}
        />
        <div className="">
          <div className="bg-blue-500/20 px-2 py-2 h-fit">
            <p className="font-bold text-xl">OTHER JOB OPENINGS</p>
            <div className="h-1.5 w-20 mt-1 bg-blue-500 " />

            <div className="mt-5">
              {(jobOpenings as ResponseData[])?.map((subDept, key) => {
                return (
                  <Fragment key={key}>
                    <div className="hover:bg-secoundary mb-4 flex justify-between items-end py-3 px-3">
                      <div className="">
                        <a
                          href={subDept.hostedUrl}
                          target="_blank"
                          className="font-bold text-md mb-2 hover:text-link transition-all"
                        >
                          {subDept.title}
                        </a>
                        <div className="flex gap-5 flex-wrap">
                          <div className="flex items-center gap-1">
                            <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                            <p className="text-sm">
                              {subDept.department?.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <p className="text-sm ">{subDept.location.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold text-xl">SHARE JOB OPENINGS</p>
            <div className="h-1.5 w-20 mt-1 bg-blue-500 " />
            <div className="mt-5 flex gap-3">
              <div className="p-2 border rounded-full w-fit h-fit">
                <img className="h-8 w-8" src={facebookIcon} alt="Your SVG" />
              </div>

              <a
                href="https://github.com/Anish42Borkar"
                target="_blank"
                className="p-2 border rounded-full w-fit h-fit"
              >
                <img className="h-8 w-8" src={linkedInIcon} alt="Your SVG" />
              </a>

              <div className="p-2 border rounded-full w-fit h-fit">
                <img className="h-8 w-8" src={twitterIcon} alt="Your SVG" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

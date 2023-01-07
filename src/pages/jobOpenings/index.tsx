import InputField from "../../components/inputField";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { ResponseData } from "./types";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { filterData } from "../../utility/filterData";
import DropdownSearchBox, {
  DropdownSearchBoxDataType,
} from "../../components/dropdownSearchBox";
import useApiResquestHandler from "../../hooks/useApiRequestHandler";
import Badges from "./badges";
import { NavLink } from "react-router-dom";

const JobOpenings = () => {
  const searchBoxRef = useRef<any>(null);
  const list = JSON.parse(localStorage.getItem("filterList")!);
  const [state, setState] = useState<
    Array<{
      id: number | string;
      title: string;
      filter: string;
    }>
  >(list || []);

  function setStateValues(
    data: DropdownSearchBoxDataType,
    dept: string,
    ref: RefObject<HTMLInputElement>
  ) {
    let list = [...state];

    if (list.find((obj) => obj.id === data.id)) {
      ref.current!.value = "";
      return;
    }

    list.push({
      id: data.id,
      title: data.title,
      filter: dept,
    });

    setState((prev) => [...list]);
    ref.current!.value = "";
    localStorage.setItem("filterList", JSON.stringify(list));
  }

  function deleteRecordFromState(id: number) {
    let list = [...state];
    list.splice(id, 1);
    setState(() => [...list]);
    localStorage.setItem("filterList", JSON.stringify(list));
  }

  function resetStates() {
    setState(() => []);
    localStorage.setItem("filterList", JSON.stringify([]));
  }

  const { request, requstedData } = useApiResquestHandler();

  const { request: requestFunctions, requstedData: requstedDataFunctions } =
    useApiResquestHandler();
  const { request: requestLocation, requstedData: requstedDataLocation } =
    useApiResquestHandler();
  const { request: requestDepartmemt, requstedData: requstedDataDepartmemt } =
    useApiResquestHandler();

  async function getData() {
    const location = state?.map((val) => {
      if (val.filter === "location") return val.id;
    });
    const department = state?.map((val) => {
      if (val.filter === "departmemt") return val.id;
    });

    const functions = state?.map((val) => {
      if (val.filter === "functions") return val.id;
    });

    const loc = [...new Set(location)].filter((val) => val).toString();
    const dept = [...new Set(department)].filter((val) => val).toString();
    const fun = [...new Set(functions)].filter((val) => val).toString();

    const paramsObj = {
      ...(loc && { loc: loc }),
      ...(dept && { dept: dept }),
      ...(fun && { fun: fun }),
      ...(searchBoxRef.current.value && { q: searchBoxRef.current.value }),
    };

    await request({
      path: "api/v1/jobs",
      data: {
        params: paramsObj,
      },
    });
  }

  async function getLists() {
    requestDepartmemt({
      path: "api/v1/departments",
    });
    requestLocation({
      path: "api/v1/locations",
    });
    requestFunctions({
      path: "api/v1/functions",
    });
  }

  const onKeyDown = (e: any) => {
    if (e.code === "Enter") {
      localStorage.setItem("search", searchBoxRef.current.value);
      getData();
    }
  };

  const onChange = (e: any) => {
    if (e.target.value === "") {
      localStorage.setItem("search", searchBoxRef.current.value);
      getData();
    }
  };

  useEffect(() => {
    getData();
    getLists();
  }, []);

  useEffect(() => {
    searchBoxRef.current.value = localStorage.getItem("search");
    getData();
  }, [state]);

  const filteredList: {
    [key: string]: ResponseData[];
  } = filterData(requstedData);

  return (
    <div className="py-7 px-9">
      <div className=" bg-primary py-8 px-8">
        <InputField
          ref={searchBoxRef}
          onKeyDown={onKeyDown}
          onChange={onChange}
          placeholder="Search for Job "
          symbol={<MagnifyingGlassIcon className="h-6 w-6 text-green-500" />}
        />
        <div className=" flex mt-8 gap-5 justify-center flex-wrap">
          <DropdownSearchBox
            data={requstedDataDepartmemt}
            placeholder="Department "
            symbol={<ChevronRightIcon className="h-6 w-6 text-green-500" />}
            onClick={(val, ref) => {
              setStateValues(val, "departmemt", ref);
            }}
          />

          <DropdownSearchBox
            data={requstedDataLocation}
            placeholder="Location "
            symbol={<ChevronRightIcon className="h-6 w-6 text-green-500" />}
            onClick={(val, ref) => {
              setStateValues(val, "location", ref);
            }}
          />

          <DropdownSearchBox
            data={requstedDataFunctions}
            placeholder="Function "
            symbol={<ChevronRightIcon className="h-6 w-6 text-green-500" />}
            onClick={(val, ref) => {
              setStateValues(val, "functions", ref);
            }}
          />
        </div>
      </div>

      <div className=" bg-primary py-8 px-8 h-min-20 mt-6 flex justify-between items-center ">
        <div className="flex flex-wrap">
          {state?.map((val, key) => {
            return (
              <Badges
                key={key}
                title={val.title}
                callBack={() => deleteRecordFromState(key)}
              />
            );
          })}
        </div>
        <button
          className=" hover:bg-gray-200 text-green-500 py-2 px-4 rounded-full"
          onClick={() => resetStates()}
        >
          Clear All
        </button>
      </div>

      {Object.keys(filteredList)?.map((dept: string, key: number) => {
        return (
          <Fragment key={key}>
            <div className="mt-10">
              <p className="font-bold text-3xl">{dept}</p>
              <div className="h-1.5 w-20 mt-1 bg-blue-500 " />
              <div className="mt-8">
                {filteredList[dept]?.map((subDept, key) => {
                  return (
                    <Fragment key={key}>
                      <div className="hover:bg-secoundary mb-4 flex flex-wrap gap-2 justify-between items-end py-3 px-3">
                        <div className="">
                          <div className="">
                            <NavLink
                              state={{ jobOpenings: filteredList[dept] }}
                              to={`details/${subDept.id}`}
                              className="  font-bold text-xl mb-2 hover:text-link transition-all"
                            >
                              {subDept.title}
                            </NavLink>
                          </div>
                          <div className="flex gap-5 flex-wrap ">
                            <div className="flex items-center gap-1">
                              <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                              <p className="text-sm">
                                {subDept.department?.title}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4 text-gray-400" />
                              <p className="text-sm ">
                                {subDept.location.title}
                              </p>
                            </div>
                            <p className="text-sm bg-grayShade py-0.5 px-5 ">
                              {subDept.type || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <a
                            href={subDept.applyUrl}
                            className="bg-transparent hover:bg-blue-500 text-link font-semibold text-sm hover:text-white py-2 px-4 border border-link hover:border-transparent rounded-full"
                          >
                            Apply
                          </a>
                          <NavLink
                            state={{ jobOpenings: filteredList[dept] }}
                            to={`details/${subDept.id}`}
                            className="text-sm hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full"
                          >
                            View
                          </NavLink>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default JobOpenings;

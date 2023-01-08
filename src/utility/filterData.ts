import { FilteredList, ResponseData } from "../pages/jobOpenings/types";

export function filterData(data: ResponseData[] | [] = []) {
  let filteredData: any = {};

  data?.map((val) => {
    if (val.department == null) {
      if (!filteredData.hasOwnProperty("Others")) {
        filteredData["Others"] = [];
      }
      let item = [val];
      filteredData["Others"].push(...item);
    } else {
      if (!filteredData.hasOwnProperty(val.department.title)) {
        filteredData[val.department?.title] = [val];
      } else {
        filteredData[val.department.title].push(val);
      }
    }
  });
  return filteredData;
}

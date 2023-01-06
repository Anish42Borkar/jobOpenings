import { DependencyList, useEffect } from "react";
import useApiResquestHandler from "./useApiRequestHandler";

type useDataProps = {
  path: string;
  data?: object;
  headers?: object;
  method?: "post" | "get";
  dep?: DependencyList | undefined;
  callBack?: (state: any) => void;
  returnCallBack?: () => void;
};

interface UseDataReturn {
  getData: () => Promise<void>;
  isLoading: boolean;
  listData: object;
}

const useData = <T>({
  path,
  method = "get",
  data,
  dep,
  headers = {},
  callBack,
  returnCallBack,
}: useDataProps): UseDataReturn extends T ? UseDataReturn : T => {
  const { request, isLoading, requstedData } = useApiResquestHandler();

  const getData = async () => {
    await request({ path, method, data, headers, callBack });
  };

  dep &&
    useEffect(() => {
      getData();
      return () => {
        returnCallBack && returnCallBack();
      };
    }, [...dep]);

  return {
    getData,
    isLoading,
    listData: requstedData,
  } as UseDataReturn extends T ? UseDataReturn : T;
};

export default useData;

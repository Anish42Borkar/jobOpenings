import { useState } from "react";
import useApiHook, { getParamsType } from "./useApiHook";

type Request = {
  path: string;
  data?: object;
  headers?: object;
  method?: "post" | "get";
  callBack?: (state: any) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
};

interface UseApiResquestHandler<T> {
  request: ({}: Request) => Promise<void>;
  isLoading: boolean;
  requstedData: T;
}

export const useApiResquestHandler = <T>(): UseApiResquestHandler<T> => {
  const { get, post } = useApiHook();

  const [requstedData, setRequstedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const request = async ({
    path,
    method = "get",

    data = {},
    headers = {},
    callBack = () => {},
    onError = () => {},
    onFinally = () => {},
  }: Request) => {
    try {
      setIsLoading((prev) => !prev);

      const response = await (method === "post"
        ? post(path, data, headers)
        : get(path, data as getParamsType));

      setRequstedData((prev) => response);
      callBack && callBack(response);
    } catch (e) {
      onError && onError(e);
    } finally {
      setIsLoading((prev) => !prev);
      onFinally && onFinally();
    }
  };

  return {
    request,
    isLoading,
    requstedData,
  } as UseApiResquestHandler<T>;
};

export default useApiResquestHandler;

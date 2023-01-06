import fetch from "../lib/fetch";

export type getParamsType = {
  params: {
    [key: string]: any;
  };
};

const useApiHook = () => {
  const get = async (url: string, params: getParamsType) => {
    try {
      const response = await fetch.get(url, params);

      return response.data;
    } catch (error) {
      return {
        status: 900,
        message: "Something went wrong " + error,
      };
    }
  };

  const post = async (url: string, data: object, headers: object = {}) => {
    try {
      const response = await fetch.post(url, data, headers);

      return response.data;
    } catch (error) {
      return {
        status: 900,
        message: "Something went wrong " + error,
      };
    }
  };

  return {
    get,
    post,
  };
};

export default useApiHook;

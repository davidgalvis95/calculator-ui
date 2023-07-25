import { calculatorApiService } from "../axios/CalculatorApi";
import useSession from "./useSession";
import useHandleResponse from "./useHandleResponse";

export const baseApiUrl = "/api/v1";

const useOperationsApi = () => {
  const { handle } = useHandleResponse();
  const { getUserToken } = useSession();

  const getRecords = async (
    pageToken,
    pageNumber,
    pageSize,
    additionalParams
  ) => {
    const url = `/records?pageNumber=${pageNumber}&pageSize=${pageSize}${
      additionalParams ? additionalParams : ""
    }`;
    return await calculatorApiService
      .get(pageToken ? pageToken : url, {
        headers: {
          Authorization: getUserToken(),
        },
      })
      .then((response) => {
        return response.data.payload;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
          status: err?.response?.status || 500
        });
      });
  };

  const calculateOperation = async (operationBody) => {
    return await calculatorApiService
      .post("/calculate", operationBody, {
        headers: {
          Authorization: getUserToken(),
        },
      })
      .then((response) => {
        return response.data.payload.operationResult.result;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
          status: err?.response?.status || 500
        });
      });
  };

  const addUserBalance = async () => {
    try {
      const response = await calculatorApiService.post(
        "/user/balance-funding",
        {},
        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      ).data;
      return handle(response);
    } catch (error) {
      return handle({
        message: "Unknown error",
        error: "Something went wrong",
      });
    }
  };

  return {
    getRecords: getRecords,
    calculateOperation: calculateOperation,
    addUserBalance: addUserBalance,
  };
};

export default useOperationsApi;

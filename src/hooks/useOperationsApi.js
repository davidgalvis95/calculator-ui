import { calculatorApiService } from "../axios/CalculatorApi";
import useSession from "./useSession";
import useHandleResponse from "./useHandleResponse";

export const baseApiUrl = "/api/v1";
import { useDispatch } from "react-redux";

const useOperationsApi = () => {
  const { handle } = useHandleResponse();
  const { getUserToken } = useSession();
  const dispatch = useDispatch();

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
        const payload = response.data.payload;
        dispatch({ type: "BALANCE_CHANGE", newBalance: payload.currentUserBalance });
        return payload.operationResult.result;
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
      return await calculatorApiService.post(
        "/user/balance-funding",
        {},
        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      ).then((response) => {
        dispatch({ type: "BALANCE_CHANGE", newBalance: response.data.payload.newBalance });
        return response.data.payload.newBalance;
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

  return {
    getRecords: getRecords,
    calculateOperation: calculateOperation,
    addUserBalance: addUserBalance,
  };
};

export default useOperationsApi;

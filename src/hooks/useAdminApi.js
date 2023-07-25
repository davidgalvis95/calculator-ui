import useHandleResponse from "./useHandleResponse";
import useSession from "./useSession";
import { calculatorApiService } from "../axios/CalculatorApi";

const useAdminApi = () => {
  const { handle } = useHandleResponse();
  const { getUserToken } = useSession();

  const getUsers = async (
    pageToken,
    pageNumber,
    pageSize,
    additionalParams
  ) => {
    const url = `/user/all?pageNumber=${pageNumber}&pageSize=${pageSize}${
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
          status: err?.response?.status || 500,
        });
      });
  };

  const deactivateUser = async (userId) => {
    return await calculatorApiService
      .post(
        `user/deactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
          status: err?.response?.status || 500,
        });
      });
  };

  const activateUser = async (userId) => {
    return await calculatorApiService
      .post(
        `user/activate/${userId}`,
        {},
        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
          status: err?.response?.status || 500,
        });
      });
  };

  const setAsAdmin = async (userId) => {
    return await calculatorApiService
      .post(
        `user/upgrade/${userId}`,
        {},
        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
          status: err?.response?.status || 500,
        });
      });
  };

  return {
    getUsers: getUsers,
    deactivateUser: deactivateUser,
    activateUser: activateUser,
    setAsAdmin: setAsAdmin,
  };
};

export default useAdminApi;

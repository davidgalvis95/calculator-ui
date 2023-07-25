import { useDispatch } from "react-redux";
import { calculatorApiService } from "../axios/CalculatorApi";
import useHandleResponse from "./useHandleResponse";

const useAdminApi = () => {
  const dispatch = useDispatch();
  const { handle } = useHandleResponse();

  const signUp = async (email, password) => {
    return await calculatorApiService
      .post(`auth/signup`, {
        email: email,
        password: password,
        status: "ACTIVE",
        roles: ["USER"],
      })
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
        });
      });
  };

  const signIn = async (email, password) => {
    return await calculatorApiService
      .post(`auth/signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch({ type: "USER_SIGNED_IN", userMeta: response.data.payload });
        return response.data.payload;
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
        });
      });
  };

  const logOut = async () => {
    return await calculatorApiService
      .post(`auth/logout`)
      .then((response) => {
        dispatch({ type: "USER_SIGNED_OUT" });
      })
      .catch((err) => {
        handle({
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Unknown error",
          error: err?.response?.data?.error || "Something went wrong",
        });
      });
  };

  return {
    signUp: signUp,
    signIn: signIn,
    logOut: logOut,
  };
};

export default useAdminApi;

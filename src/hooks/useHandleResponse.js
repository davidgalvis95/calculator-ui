import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useHandleResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = async (response) => {
    if (response.error) {
      if (response.status === 401 || response.status === 403) {
        navigate("/sign-in")
        dispatch({ type: "USER_SIGNED_OUT" });
        return;
      } else {
        dispatch({
          type: "ERROR",
          title: response.message,
          message: response.error,
        });
        return {
          payload: null,
        };
      }
    } else {
      return response.payload ? response.payload : response.message;
    }
  };

  return {
    handle: handle,
  };
};

export default useHandleResponse;

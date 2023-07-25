import { useSelector } from "react-redux";

const useSession = () => {
  const { userMeta } = useSelector((state) => state.auth);

  const getUserToken = () => {
    return `Bearer ${userMeta.accessToken}`;
  };
  return {
    getUserToken: getUserToken,
  };
};

export default useSession;

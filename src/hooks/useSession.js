import { useSelector } from "react-redux";

const useSession = () => {
  const { userMeta } = useSelector((state) => state.user);

  const getUserToken = () => {
    return `Bearer ${userMeta.accessToken}`;
  };
  return {
    getUserToken: getUserToken,
  };
};

export default useSession;

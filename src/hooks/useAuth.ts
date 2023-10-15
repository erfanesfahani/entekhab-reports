import useSWR from "swr";
import callApi from "../helpers/callApi";

const useAuth = () => {
  const { data, error, mutate } = useSWR("get_user", () => {
    return callApi().get("/user");
  });

  return { user: data?.data?.user, error, loading: !data && !error, mutate };
};

export default useAuth;

import useSWR from "swr";

export default function useAuth() {
  const { data, mutate, error } = useSWR("api_user", async () => {
    if (document.cookie.includes("entekhabToken")) {
      return true;
    }
    const error: any = new Error("Not authorized!");
    error.status = 403;
    throw error;
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

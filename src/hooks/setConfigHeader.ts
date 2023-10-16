import getCookie from "./getCookie";

export default function setConfigHeader() {
  const token = getCookie("entekhabToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

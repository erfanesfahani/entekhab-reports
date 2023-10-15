import useSWR from "swr";
import CustomTable from "@/components/shared/customTable/customTable";
import { useCookies } from "react-cookie";
import callApi from "@/helpers/callApi";

interface Props {}

export default function ReportTable({}: Props) {
  const [cookies] = useCookies(["entekhabToken"]);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.entekhabToken}`,
    },
  };
  const GetReportsData = () =>
    callApi()
      .get("/reports", config)
      .then((res) => res.data);
  const { data, error } = useSWR("/reports", GetReportsData);

  console.log("swr data", data);
  return (
    <div className="report-table my-4">
      <CustomTable />
    </div>
  );
}

import Report from "@/models/report";
import callApi from "../helpers/callApi";
import setConfigHeader from "@/hooks/setConfigHeader";

export async function CreateReport(values: Report) {
  return await callApi().post(
    "/reports",
    {
      ...values,
    },
    setConfigHeader()
  );
}

export async function UpdateReport(reportId: string, values: Report) {
  return await callApi().put(
    "/reports/" + reportId,
    {
      ...values,
    },
    setConfigHeader()
  );
}

export async function DeleteReport(reportId: string) {
  return await callApi().delete("/reports/" + reportId, setConfigHeader());
}

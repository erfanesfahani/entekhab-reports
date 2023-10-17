"use client";

import useSWR from "swr";
import callApi from "@/helpers/callApi";
import setConfigHeader from "@/hooks/setConfigHeader";
import PageHeader from "@/components/panel/pageHeader/pageHeader";
import ReportForm from "@/components/panel/reportForm/reportForm";
import BarSpinner from "@/components/shared/barSpinner/barSpinner";

const ReportEdit = ({ params }: any) => {
  const GetReportsData = () =>
    callApi()
      .get("/reports", setConfigHeader())
      .then((res) => res.data);
  const { data, error } = useSWR("/reports", GetReportsData);
  const singleRep = data?.data.find((item: any) => item.id === params.reportId);
  return (
    <div>
      <PageHeader title={`ویرایش گزارش  ${singleRep?.title}`} />
      {!data && !error ? (
        <BarSpinner />
      ) : (
        <ReportForm method="edit" singleReport={singleRep} />
      )}
    </div>
  );
};

export default ReportEdit;

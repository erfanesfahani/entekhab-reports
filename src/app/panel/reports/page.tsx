"use client";

import PageHeader from "@/components/panel/pageHeader/pageHeader";
import CustomTable from "@/components/shared/customTable/customTable";
import callApi from "@/helpers/callApi";
import { useCookies } from "react-cookie";

export default function Reports() {
  const [cookies] = useCookies(["entekhabReports"]);

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.entekhabReports}`,
    },
  };
  const getData = async () => {
    try {
      const res = await callApi().get("/reports", config);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  // const res = getData();
  return (
    <div>
      <PageHeader
        title="لیست گزارشات"
        subTitle="آخرین اطلاعات ورودی ثبت شده توسط کاربران سیستم"
      />
      {/* {JSON.stringify(res)} */}
      <CustomTable className="mt-4" />
    </div>
  );
}

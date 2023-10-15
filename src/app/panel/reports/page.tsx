"use client";

import PageHeader from "@/components/panel/pageHeader/pageHeader";
import ReportTable from "@/components/panel/reportTable/reportTable";

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="لیست گزارشات"
        subTitle="آخرین اطلاعات ورودی ثبت شده توسط کاربران سیستم"
      />
      {/* {JSON.stringify(res)} */}
      <ReportTable />
    </div>
  );
}

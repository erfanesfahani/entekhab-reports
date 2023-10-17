"use client";

import PageHeader from "@/components/panel/pageHeader/pageHeader";
import ReportTable from "@/components/panel/reportTable/reportTable";
import Link from "next/link";

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="لیست گزارشات"
        subTitle="آخرین اطلاعات ورودی ثبت شده توسط کاربران سیستم"
      >
        <Link href="reports/add" className="btn btn-primary">
          ایجاد گزارش
        </Link>
      </PageHeader>
      <ReportTable />
    </div>
  );
}

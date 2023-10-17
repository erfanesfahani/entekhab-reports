"use client";

import ReportForm from "@/components/panel/reportForm/reportForm";
import PageHeader from "@/components/panel/pageHeader/pageHeader";

export default function AddReport() {
  return (
    <div>
      <PageHeader title="ایجاد گزارش" />
      <ReportForm method="add" />
    </div>
  );
}

"use client";

import PageHeader from "@/components/panel/pageHeader/pageHeader";
import { Space, Skeleton } from "antd";

export default function Panel() {
  return (
    <div>
      <PageHeader
        title="پیشخوان"
        subTitle="این صفحه می تواند به عنوان نمایش آمار، اطلاعات کلی و ... استفاده گردد. برای ورود از منوی کنار به بخش گزارشات وارد شوید."
      />
      <Skeleton active className="mt-4" />
    </div>
  );
}

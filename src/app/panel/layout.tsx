import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  description: "توسعه داده شده توسط گروه انتخاب",
};

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

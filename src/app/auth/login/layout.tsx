import type { Metadata } from "next";
import "./assets/styles/style.scss";

export const metadata: Metadata = {
  title: "ورود اعضا",
  description: "توسعه داده شده توسط گروه انتخاب",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="login-page">{children}</div>;
}

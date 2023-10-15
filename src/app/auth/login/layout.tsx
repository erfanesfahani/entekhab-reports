"use client";

// import type { Metadata } from "next";
import "./assets/styles/style.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "ورود اعضا",
//   description: "توسعه داده شده توسط گروه انتخاب",
// };

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, mutate, loggedOut, loading } = useAuth();
  if (user) {
    router.push("/panel");
    return <></>;
  }
  if (loading) return <>redirecting...</>;
  return <div className="login-page">{children}</div>;
}

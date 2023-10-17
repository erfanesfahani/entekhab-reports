"use client";

import BarSpinner from "@/components/shared/barSpinner/barSpinner";
import "./assets/styles/style.scss";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, mutate, loggedOut, loading } = useAuth();
  if (user) {
    router.push("/panel/reports");
    return <></>;
  }
  if (loading) return <BarSpinner />;
  return <div className="login-page">{children}</div>;
}

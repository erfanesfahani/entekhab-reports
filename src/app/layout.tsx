"use client";
import "../assets/styles/main.scss";
import { Inter } from "next/font/google";
import { ToastProvider } from "react-toast-notifications";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";
import StyledComponentsRegistry from "@/lib/antdRegistery";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ToastProvider
          placement="bottom-left"
          autoDismissTimeout={3000}
          autoDismiss
        >
          <ConfigProvider theme={theme} direction="rtl">
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

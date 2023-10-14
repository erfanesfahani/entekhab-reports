// import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";
import StyledComponentsRegistry from "@/lib/antdRegistery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "پرتال گزارشات",
  description: "توسعه داده شده توسط گروه انتخاب",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}

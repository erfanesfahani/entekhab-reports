"use client";
import { useEffect, useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import "./assets/styles/style.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { removeLoginToken } from "@/helpers/auth";

type MenuItem = Required<MenuProps>["items"][number];

const { Header, Content, Footer, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("گزارشات", "/panel", <FileTextOutlined />, [
    getItem("افزودن", "/reports/add"),
    getItem("ورودی ها", "/reports"),
  ]),
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click", e);
    router.push(e.keyPath[1] + e.key);
  };
  const { user, loading, loggedOut, mutate } = useAuth();

  const logoutHandler = async () => {
    await removeLoginToken();
    await mutate();
  };
  if (loggedOut) {
    router.push("/auth/login");
    mutate(undefined);
    return <></>;
  }
  if (loading) return <>redirecting...</>;

  return (
    <Layout hasSider className="panel-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="panel-layout--sider"
      >
        <div className="logo-container mb-3">
          <Link href="/panel"></Link>
        </div>
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="d-flex justify-content-end px-4"
        >
          <div>
            <a
              onClick={(e) => {
                e.preventDefault();
                logoutHandler();
              }}
              href=""
              className="text-decoration-none"
            >
              خروج
            </a>
          </div>
        </Header>
        <Content style={{ margin: "30px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", padding: "5px" }}>
          توسعه یافته شده توسط گروه انتخاب
        </Footer>
      </Layout>
    </Layout>
  );
}

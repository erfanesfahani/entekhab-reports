"use client";
import { useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import "./assets/styles/style.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    console.log("click", e);
    router.push(e.keyPath[1] + e.key);
  };
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
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

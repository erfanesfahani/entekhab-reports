"use client";
import { useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import "./assets/styles/style.scss";

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
  getItem("گزارشات", "sub1", <FileTextOutlined />, [
    getItem("افزودن", "1"),
    getItem("ورودی ها", "2"),
  ]),
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider className="panel-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="panel-layout--sider"
      >
        <div className="logo-container mb-3">
          <a href=""></a>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} items={items} />
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
